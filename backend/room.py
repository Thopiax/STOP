class Room():

    def __init__(self):
        self.players = {}
        self.id = []

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