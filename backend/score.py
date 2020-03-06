def calculate_score(answers: dict):
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
    intermediate = {}

    for player, player_answers in answers.items():
        for category, answer in player_answers.items():
            if answer not in intermediate:
                intermediate[answer] = []

            intermediate[answer].append(player)

    points = {}

    for word, players in intermediate.items():
        for player in players:
            if player not in points:
                points[player] = 0

            if len(players) > 1:
                points[player] += 5
            elif len(players) == 1:
                points[player] += 10
            else:
                raise AssertionError("Something fucked up")

    return points
