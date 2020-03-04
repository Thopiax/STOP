class Room():

    def __init__(self):
        self.players = {}
        self.id = []

    def add_player(self, player):
        self.players[player.id] = player

    def start_game(self):
        self.points = {}
        pass

    def start_round(self):
        pass

    def finish_round(self):
        pass

    def finish_game(self):
        pass

def get_new_room_id():
    return 1