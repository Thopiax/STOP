class Player:

    def __init__(self, id, room, name):
        self.id = id
        self.room = room
        self.name = name

    def to_json(self):
        return {
            "id": self.id,
            "room_id": self.room.id,
            "name": self.name
        }
