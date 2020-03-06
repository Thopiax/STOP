from flask import Flask, jsonify
from flask_socketio import SocketIO, emit

from backend.exceptions import BadRequestException
from backend.player import Player, get_new_color
from backend.room import get_new_room_id, Room
from backend.rooms import rooms, get_room_if_exists

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.errorhandler(BadRequestException)
def handle_bad_request(e):
    return jsonify(error(e))


def error(e):
    return {
        "message": e.message
    }


@app.route("/create_room")
def create_room():
    id = get_new_room_id()
    room = Room(id)

    rooms[id] = room
    print(rooms)

    return jsonify(room.to_json())


@app.route("/join_room/<room_id>")
def join_room(room_id):
    room = get_room_if_exists(room_id)
    color = get_new_color()
    player = Player(room, color)

    room.add_player(player)

    # Setup websocket

    return jsonify(player.to_json())


@app.route("/list_rooms")
def list_rooms():
    return jsonify([r.to_json() for r in rooms.values()])


@app.route("/start_game/<room_id>")
def start_game(room_id):
    room = get_room_if_exists(room_id)
    room.start_game()
    return jsonify(room.to_json())


@socketio.on('connect')
def test_connect():
    emit('connect', {'data': 'Connected'})


@socketio.on('initialize_room')
def initialize(room_id):
    print("brap")
    room = get_room_if_exists(room_id)
    emit('something', {'data': room})


@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    emit('error', error(e))


socketio.run(app, debug=True)
