next_room_id = 0


class Room:

    def __init__(self, room_id):
        self.players = {}
        self.id = room_id
        self.round_points = {}

    def add_player(self, player):
        self.players[player.id] = player

    def start_game(self):
        pass

    def start_round(self):
        pass

    def finish_round(self):
        pass

    def finish_game(self):
        pass

    def choose_letter(self):
        pass

    def calculate_score(self, player_answers):

        return self.round_points

    def to_json(self):
        return {
            "id": self.id
        }


def get_new_room_id():
    global next_room_id
    next_room_id += 1
    return next_room_id
