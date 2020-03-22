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

    expected_breakdown = {
        "BLUE": {
            "Cars": 10
        },
        "RED": {
            "Cars": 10
        }
    }

    points, breakdown = calculate_score(["BLUE", "RED"], ["Cars"], answers)

    assert points == expected_points
    assert breakdown == expected_breakdown


def test_calculate_score_should_grant_less_points_if_not_unique_word():
    answers = {
        "BLUE": {
            "Cars": "BMW",
            "Food": "Something",
        },
        "RED": {
            "Cars": "BMW",
            "Food": "Something Else",
        }
    }

    expected_points = {
        "BLUE": 15,
        "RED": 15
    }

    expected_breakdown = {
        "BLUE": {
            "Cars": 5,
            "Food": 10,
        },
        "RED": {
            "Cars": 5,
            "Food": 10,
        }
    }

    points, breakdown = calculate_score(["BLUE", "RED"], ["Cars", "Food"], answers)

    assert points == expected_points
    assert breakdown == expected_breakdown


def test_score_should_be_zero_if_no_answer():
    answers = {
        "BLUE": {
            "Cars": "BMW"
        },
        "RED": {
            "Cars": None
        }
    }

    expected_points = {
        "BLUE": 10,
        "RED": 0
    }

    expected_breakdown = {
        "BLUE": {
            "Cars": 10
        },
        "RED": {
            "Cars": 0
        }
    }

    points, breakdown = calculate_score(["BLUE", "RED"], ["Cars"], answers)

    assert points == expected_points
    assert breakdown == expected_breakdown
