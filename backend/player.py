class Player:

    def __init__(self, room, color):
        self.room = room
        self.id = color
        self.points = 0


    def to_json(self):
        return {
            "id": self.id,
            "room_id": self.room.id,
            "points": self.points,
        }


colors = ["BLUE", "RED", "PURPLE", "YELLOW"]


def get_new_color():
    return colors.pop()
