from enum import Enum, auto
from typing import List, Dict, Optional

from backend.exceptions import BadRequestException
from backend.player import Player
from backend.round import Round
from string import ascii_uppercase
from random import randint

next_room_id = 0


class RoomState(Enum):
    LOBBY = "lobby"
    RUNNING = "running"
    STOPPED = "stopped"


class Room:

    def __init__(self, room_id: int):
        self.players = {}
        self.id = room_id
        self.unused_letters: List = list(ascii_uppercase)
        self.current_round: Optional[Round] = None
        self.categories: List[str] = []
        self.round_history: List[Round] = []
        self.host = None
        self.unused_colors = ["YELLOW", "PURPLE", "RED", "BLUE"]
        self.state = RoomState.LOBBY

    def get_new_color(self):
        if not self.unused_colors:
            raise BadRequestException("This room is currently full.")

        # TODO: Pop when not developing
        return self.unused_colors.pop()
        # return self.unused_colors[0]

    def add_player(self, player: Player):
        self.players[player.id] = player

        # First player to be added to the room is the host
        if self.host is None:
            self.host = player.id

    def get_player_if_exists(self, player_id):
        if player_id in self.players:
            return self.players[player_id]

        raise BadRequestException(f"Player with ID {player_id} does not exist in room {self.id}")

    def return_to_lobby(self):
        self.state = RoomState.LOBBY
        self.current_round = None

    def start_round(self):
        letter = self.choose_letter()
        self.current_round = Round(list(self.players.values()), letter, self.categories)
        self.state = RoomState.RUNNING

    def stop_round(self, player: Player):
        self.current_round.stop(player)
        self.round_history.append(self.current_round)
        self.state = RoomState.STOPPED

    def choose_letter(self) -> str:
        random_index = randint(0, len(self.unused_letters) - 1)
        random_letter = self.unused_letters.pop(random_index)
        return random_letter

    def choose_categories(self, categories):
        self.categories = categories

    def change_name(self, player: Player, new_name: str):
        player.name = new_name

    def total_points(self):
        total_points = {player: 0 for player in self.players}
        for round in self.round_history:
            for player, points_this_round in round.points.items():
                total_points[player] += points_this_round

        return total_points

    def to_json(self):
        return {
            "id": self.id,
            "state": self.state.value,
            "current_round": self.current_round.to_json() if self.current_round else None,
            "players": {player_id: player.to_json() for player_id, player in self.players.items()},
            "unused_letters": self.unused_letters,
            "round_history": [round.to_json() for round in self.round_history],
            "host": self.host,
            "total_points": self.total_points()
        }


def get_new_room_id():
    global next_room_id
    next_room_id += 1
    return next_room_id
