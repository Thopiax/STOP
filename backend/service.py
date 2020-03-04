from flask import Flask, jsonify

from backend.player import Player, get_new_color
from backend.room import get_new_room_id

app = Flask(__name__)


rooms = {}


def error(message):
    return jsonify({
        "message": message
    })


@app.route("/create_room")
def create_room():
    id = get_new_room_id()
    room = Room(id)

    rooms[id] = room

    return jsonify(room)


@app.route("/join_room/{room_id}")
def join_room(room_id):

    if room_id not in rooms:
        return error("That room does not exist")

    room = rooms[room_id]
    color = get_new_color()
    player = Player(room, color)

    room.add_player(player)

    return jsonify(player)





app.run(debug=True)

