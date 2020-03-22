from typing import Optional, List

from backend.exceptions import BadRequestException
from backend.player import Player
from backend.score import calculate_score


class Round:
    def __init__(self, players: List[Player], letter: str, categories: List[str]):
        self.letter = letter
        self.categories = categories
        self.answers = {player.id: {category: None for category in categories} for player in players}
        self.point_breakdown = {}
        self.points = {}
        self.stopped_by: Optional[Player] = None
        self.players = players

    def stop(self, player):
        for category in self.answers[player.id]:
            answer = self.answers[player.id][category]
            if answer is None:
                raise BadRequestException(f"You must submit an answer for all categories!")

        self.stopped_by = player
        points, breakdown = calculate_score([player.id for player in self.players], self.categories, self.answers)
        self.points = points
        self.point_breakdown = breakdown

    def submit_answer(self, player: Player, category: str, answer: str):
        if not answer.upper().startswith(self.letter):
            raise BadRequestException(f"{answer} does not start with a letter {self.letter}!")

        self.answers[player.id][category] = answer

    def to_json(self):
        return {
            "letter": self.letter,
            "categories": self.categories,
            "answers": self.answers,
            "points": self.points,
            "points_breakdown": self.point_breakdown,
            "stopped_by": self.stopped_by.id if self.stopped_by else None,
        }
