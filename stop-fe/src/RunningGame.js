import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export const RunningGame = ({room, player, sendMessage}) => {

    const round = room.current_round;
    const initialAnswers = {};

    round.categories.forEach(category => {
        initialAnswers[category] = ""
    });
    console.log("initial")
    console.log(initialAnswers)

    const [answers, setAnswers] = useState(initialAnswers);

    const countAnswers = () => {
        let numberOfAnswers = 0;

        round.categories.forEach(category => {
            console.log("Answer for " + category + ": " + answers[category]);
            if (answers[category] !== "") {
                console.log("not equal")
                numberOfAnswers += 1;
            }
        });
        return numberOfAnswers;
    };

    const onAnswerChange = (category, newValue) => {
        setAnswers({...answers, [category]: newValue});
    };

    const stop = () => {
        sendMessage("stop_round", {
            "room_id": room.id,
            "player_id": player.id
        })
    };

    const submitAnswer = (category) => {
        sendMessage("submit_answer", {
            "room_id": room.id,
            "player_id": player.id,
            "category": category,
            "answer": answers[category]
        })
    };

    const onKeyDown = (e, category) => {
        if (e.keyCode === 13) {
            submitAnswer(category)
        }
    };

    return (
        <Grid container xs={12} spacing={3}>
            <Grid item xs={12}>
                <h3>The current letter is {round.letter}</h3>
                <h4>Submit your answers below!</h4>
            </Grid>
            <Grid item xs={12}>
                {
                    round.categories.map(category =>
                        <TextField
                            key={category}
                            label={category}
                            value={answers[category]}
                            onChange={(e) => onAnswerChange(category, e.target.value)}
                            onBlur={() => submitAnswer(category)}
                            onKeyDown={(e) => onKeyDown(e, category)}
                        />
                    )
                }
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={stop}
                    disabled={countAnswers() !== round.categories.length}
                >
                    STOP!
                </Button>
            </Grid>
        </Grid>
    )

};