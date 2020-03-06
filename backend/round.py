class Round:
    def __init__(self, letter, categories):
        self.letter = letter
        self.categories = categories
        self.answers = {}
        self.points = {}
        self.id = {}

    def set_player_answers(self, player, categories, answers):
        self.answers[player][categories] = answers
