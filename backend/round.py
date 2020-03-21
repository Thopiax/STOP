from typing import Optional

from backend.player import Player
from backend.score import calculate_score


class Round:
    def __init__(self, letter, categories):
        self.letter = letter
        self.categories = categories
        self.answers = {}
        self.points = {}
        self.stopped_by: Optional[Player] = None

    def stop(self, player):
        self.stopped_by = player
        self.points = calculate_score(self.answers)

    def submit_answer(self, player: Player, category: str, answer: str):
        if player.id not in self.answers:
            self.answers[player.id] = {}

        self.answers[player.id][category] = answer

    def to_json(self):
        return {
            "letter": self.letter,
            "categories": self.categories,
            "answers": self.answers,
            "points": self.points,
            "stopped_by": self.stopped_by.id if self.stopped_by else None,
        }
