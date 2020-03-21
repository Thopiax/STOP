import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export const RunningGame = ({room, player}) => {

    const round = room.current_round;
    const initialAnswers = {};

    for (const category in round.categories) {
        initialAnswers[category] = ""
    }

    const answers = useState(initialAnswers);

    const onAnswerChange = (category, newValue) => {
        answers[category] = newValue;
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
                        />
                    )
                }
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" color="primary">
                    STOP!
                </Button>
            </Grid>
        </Grid>
    )

};