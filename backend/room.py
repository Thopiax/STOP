next_room_id = 0


class Room:

    def __init__(self, room_id):
        self.players = {}
        self.id = room_id

    def add_player(self, player):
        self.players[player.id] = player

    def start_game(self, game):
        pass

    def start_round(self):
        pass

    def finish_round(self):
        pass

    def finish_game(self):
        pass

    def to_json(self):
        return {
            "id": self.id
        }


def get_new_room_id():
    global next_room_id
    next_room_id += 1
    return next_room_id
