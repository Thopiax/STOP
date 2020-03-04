from backend.exceptions import BadRequestException

rooms = {}


def get_room_if_exists(room_id):
    room_id = int(room_id)

    if room_id not in rooms:
        raise BadRequestException("That room does not exist")

    room = rooms[room_id]
    return room
