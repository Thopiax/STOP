class Player:

    def __init__(self, room, color):
        self.room = room
        self.id = color
        self.points = 0
        self.answers = {}

    def to_json(self):
        return {
            "room": self.room.id,
            "color": self.room
        }


def get_new_color():
    return "BLUE"
