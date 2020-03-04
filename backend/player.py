class Player:

    def __init__(self, room, color):
        self.room = room
        self.id = color

    def to_json(self):
        return {
            "room": self.room.id,
            "color": self.room
        }


def get_new_color():
    return "BLUE"
