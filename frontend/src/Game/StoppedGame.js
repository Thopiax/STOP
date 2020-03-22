import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {BounceInDown, BounceInLeft, BounceInRight, FadeIn} from "../Components";


export const StoppedGame = ({room, player, sendMessage}) => {

    const round = room.current_round;
    const isHost = room.host === player.id;
    const numPlayers = Object.keys(room.players).length;
    const numCategories = room.categories.length;
    const delayBeforeCategories = 5;
    const delayBetweenPlayers = 1;
    const delayBetweenCategories = 2;

    const newRound = () => {
        sendMessage("return_to_lobby", {
            "room_id": room.id
        })
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <BounceInDown><h1>The round is over! {round.stopped_by} called STOP!</h1></BounceInDown>
                <BounceInDown style={{animationDelay: "1s"}}><h2>The letter was {round.letter}</h2></BounceInDown>
                <BounceInDown style={{animationDelay: "2s"}}><h3>Let's see how you did...</h3></BounceInDown>
            </Grid>
            <Grid item xs={12}>
                {
                    round.categories.map((category, index) => {
                        const Bounce = index % 2 === 0 ? BounceInRight : BounceInLeft;
                        const delay = delayBeforeCategories + (index * delayBetweenCategories) + index * numPlayers;
                        console.log("Category " + category + " delay " + delay);

                        return (
                                <div key={category}>
                                    <Bounce style={{animationDelay: delay + "s"}}>
                                    <h2>Category {index + 1}: {category}</h2>
                                    </Bounce>
                                    {
                                        Object.keys(room.players).map((id, playerIndex) => {
                                            const player = room.players[id];
                                            const answer = round.answers[id][category];
                                            const points = round.points_breakdown[id][category];
                                            const playerDelay = delay + delayBetweenPlayers + playerIndex;
                                            let contents = null;
                                            console.log("Category " + category + " player " + id + " delay " + playerDelay);

                                            if (answer === null) {
                                                contents =  <p>{player.name} did not answer and
                                                    scored {points} points</p>
                                            } else {
                                                contents = <p>{player.name} answered '{answer}' and
                                                    scored {points} points</p>
                                            }

                                            return (
                                                <Bounce
                                                    key={id}
                                                    style={{animationDelay: playerDelay + "s"}}
                                                >
                                                    {contents}
                                                </Bounce>
                                            )
                                        })
                                    }
                                </div>
                        )
                    })
                }
            </Grid>
            <Grid item xs={12}>
                <FadeIn style={{animationDelay:
                        (delayBeforeCategories +
                        (numCategories * delayBetweenCategories) *
                        (delayBetweenPlayers + numPlayers)) + "s"}}>
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
                </FadeIn>
            </Grid>
        </Grid>
    )

};