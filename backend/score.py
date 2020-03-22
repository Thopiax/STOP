from typing import List

from backend.player import Player


def calculate_score(players: List[str], categories: List[str], answers: dict):
    """
    answers = {
        "BLUE": {"cars" : "BMW",
                 "artist": "Jay-Z"},
        "RED": {"cars" : "BMW",
                "artist" : "Kanye"},
        "GREEN":{"cars" : "Mercedes",
                 "artist" : "Jay-Z"}
    }

    intermediate = {
        "BMW": ["BLUE", "RED"]
    }
    """
    intermediate = {category: {} for category in categories}

    for player_id, player_answers in answers.items():
        for category, answer in player_answers.items():
            # A None answer means that the player hasn't answered this category
            if not answer:
                continue

            if answer not in intermediate[category]:
                intermediate[category][answer] = []

            intermediate[category][answer].append(player_id)

    points = {player_id: 0 for player_id in players}
    breakdown = {player_id: {category: 0 for category in categories} for player_id in players}

    for category, category_breakdown in intermediate.items():
        for word, word_players in category_breakdown.items():
            for player_id in word_players:
                if len(word_players) > 1:
                    breakdown[player_id][category] = 5
                    points[player_id] += 5
                elif len(word_players) == 1:
                    breakdown[player_id][category] = 10
                    points[player_id] += 10
                else:
                    raise AssertionError("Something fucked up")

    return points, breakdown
