from typing import List, Dict, Optional

from backend.player import Player
from backend.round import Round
from string import ascii_uppercase
from random import randint

next_room_id = 0


class Room:

    def __init__(self, room_id: int):
        self.players = {}
        self.id = room_id
        self.unused_letters: List = list(ascii_uppercase)
        self.current_round: Optional[Round] = None
        self.categories: List[str] = []
        self.round_history: List[Round] = []

    def add_player(self, player: Player):
        self.players[player.id] = player

    def start_round(self):
        letter = self.choose_letter()
        self.current_round = Round(letter, self.categories)
        return self.current_round

    def stop_round(self, player: Player) -> Dict[str, int]:
        self.current_round.stop(player)
        self.round_history.append(self.current_round)
        self.current_round = None

    def choose_letter(self) -> str:
        random_index = randint(0, len(self.unused_letters) - 1)
        random_letter = self.unused_letters.pop(random_index)
        return random_letter

    def choose_categories(self, categories):
        self.categories = categories

    def end_game(self):
        total_points = {player: 0 for player in self.players}
        for round in self.round_history:
            for player, points_this_round in round.points.items():
                total_points[player] += points_this_round

        return total_points

    @property
    def running(self):
        return self.current_round is not None

    def to_json(self):
        return {
            "id": self.id,
            "running": self.running,
            "current_round": self.current_round.to_json() if self.running else None,
            "players": {player_id: player.to_json() for player_id, player in self.players.items()},
            "unused_letters": self.unused_letters,
        }


def get_new_room_id():
    global next_room_id
    next_room_id += 1
    return next_room_id
