from unittest.mock import patch

from backend.player import Player
from backend.room import Room, get_new_room_id


def test_end_to_end():

    room = Room(get_new_room_id())
    p1 = Player(room, room.get_new_color())
    p2 = Player(room, room.get_new_color())

    room.add_player(p1)
    room.add_player(p2)

    assert room.host == p1.id

    room.choose_categories(["Cars", "Drinks"])

    with patch("backend.room.randint", return_value=1):
        room.start_round()

    round = room.current_round
    assert round.letter == "B"

    round.submit_answer(p1, "Cars", "BMW")
    round.submit_answer(p2, "Cars", "BMW")
    round.submit_answer(p1, "Drinks", "Bacardi")
    room.stop_round(p1)

    assert round.points[p1.id] == 15
    assert round.points[p2.id] == 5
    assert len(room.round_history) == 1

    room.choose_categories(["Cars", "Drinks", "Movies"])

    with patch("backend.room.randint", return_value=1):
        room.start_round()

    round = room.current_round
    assert round.letter == "C"

    round.submit_answer(p1, "Cars", "Chevrolet")
    round.submit_answer(p2, "Cars", "Cadillac")
    round.submit_answer(p1, "Drinks", "Coke")
    round.submit_answer(p2, "Drinks", "Coke")
    round.submit_answer(p1, "Movies", "Cindarella")
    room.stop_round(p1)

    assert round.points[p1.id] == 25
    assert round.points[p2.id] == 15
    assert len(room.round_history) == 2

    points = room.total_points()

    assert points[p1.id] == 40
    assert points[p2.id] == 20
