import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


export const StoppedGame = ({room, player, sendMessage}) => {

    const round = room.current_round;
    const isHost = room.host === player.id;

    const newRound = () => {
        sendMessage("return_to_lobby", {
            "room_id": room.id
        })
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>The round is over! {round.stopped_by} called STOP!</h1>
                <h2>The letter was {round.letter}</h2>
                <h3>Let's see how you did...</h3>
            </Grid>
            <Grid item xs={12}>
                {
                    round.categories.map((category, index) =>
                        <div key={category}>
                            <h2>Category {index + 1}: {category}</h2>
                            {
                                Object.keys(room.players).map(id => {
                                    const player = room.players[id];

                                    return <p key={id}>{player.id} answered {round.answers[id][category]} and scored {round.points[id]} points</p>
                                })
                            }
                        </div>
                    )
                }
            </Grid>
            <Grid item xs={12}>
                {
                    isHost ?
                        <div>
                            <p>Would you like to play again?</p>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={newRound}
                            >
                                New Round
                            </Button>
                        </div>
                        : <p>Waiting for host {round.host} to start new game...</p>
                }
            </Grid>
        </Grid>
    )

};