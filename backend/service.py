from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from backend.exceptions import BadRequestException
from backend.player import Player
from backend.room import get_new_room_id, Room
from backend.rooms import rooms, get_room_if_exists

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.errorhandler(BadRequestException)
def handle_bad_request(e):
    return jsonify(error(e.message)), 400


def error(message):
    return {
        "message": message
    }


@app.route("/create_room")
def create_room():
    id = get_new_room_id()
    room = Room(id)

    rooms[id] = room

    return jsonify(room.to_json())


@app.route("/list_rooms")
def list_rooms():
    return jsonify([r.to_json() for r in rooms.values()])


@socketio.on("connect")
def connect():
    emit("connect", {"data": "Connected!"})


@socketio.on("join_room")
def join_room(room_id):
    room = get_room_if_exists(room_id)
    color = room.get_new_color()
    player = Player(room, color)

    room.add_player(player)

    response = {
        "player": player.to_json(),
        "room": room.to_json()
    }

    print("Joining room")
    emit("join_room", response)


@socketio.on("start_round")
def start_round(payload):
    room = get_room_if_exists(payload["room_id"])
    room.choose_categories(payload["categories"])
    room.start_round()
    emit("start_round", room.to_json())


@socketio.on("end_round")
def end_round(room_id):
    room = get_room_if_exists(room_id)
    round = room.end_round()
    emit("end_round", round.to_json())


@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    emit("error", error(str(e)))


# TODO: Remove this when not in development
with app.app_context():
    create_room()


socketio.run(app, debug=True)
