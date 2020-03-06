from backend.score import calculate_score


def test_calculate_score_should_grant_maximum_points_if_unique_word():
    answers = {
        "BLUE": {
            "Cars": "BMW"
        },
        "RED": {
            "Cars": "Mercedes"
        }
    }

    expected_points = {
        "BLUE": 10,
        "RED": 10
    }

    points = calculate_score(answers)

    assert points == expected_points
