next_room_id = 0

from backend.round import Round

class Room:

    def __init__(self, room_id):
        self.players = {}
        self.id = room_id
        self.running = False

    def add_player(self, player):
        self.players[player.id] = player

    def start_game(self):
        self.points = {}
        self.running = True

    def start_round(self):
        letter = self.choose_letter()
        round = Round(letter)
        pass

    def finish_round(self):
        pass

    def finish_game(self):
        pass

    def choose_letter(self):
        pass

    def to_json(self):
        return {
            "id": self.id,
            "running": self.running
        }


def get_new_room_id():
    global next_room_id
    next_room_id += 1
    return next_room_id
