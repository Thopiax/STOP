class Player:

    def __init__(self, room, color):
        self.room = room
        self.id = color

    def to_json(self):
        return {
            "id": self.id,
            "room_id": self.room.id,
        }
