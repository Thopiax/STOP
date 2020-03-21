import React, {useCallback, useEffect, useState} from "react";
import env from "./Environment";
import {useParams} from "react-router-dom";
import {Lobby} from "./Lobby";
import Alert from "@material-ui/lab/Alert";
import {ReadyState, useSocketIO} from "react-use-websocket";
import SocketContext, {makeMessage} from "./SocketContext";
import {RunningGame} from "./RunningGame";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {StoppedGame} from "./StoppedGame";


const GameState = {
    NOT_JOINED: "not_joined",
    LOBBY: "lobby",
    RUNNING: "running",
    STOPPED: "stopped"
    // TODO: Review phase
};


export const Room = (props) => {
    let {roomId} = useParams();

    const [player, setPlayer] = useState();
    const [room, setRoom] = useState();
    const [alertMessage, setAlertMessage] = useState("");
    const [sendSocketIOMessage, lastMessage, readyState] = useSocketIO(env.WEBSOCKET_URL);

    const sendMessage = useCallback((type, payload) => {
        return sendSocketIOMessage(makeMessage(type, payload));
    }, [sendSocketIOMessage]);

    const gameState = room === undefined ? GameState.NOT_JOINED : room.state;

    useEffect(() => {
        if (readyState === ReadyState.OPEN && gameState === GameState.NOT_JOINED) {
            sendMessage("join_room", roomId);
        }
    }, [setPlayer, roomId, readyState, sendMessage, gameState]);

    useEffect(() => {
        if (lastMessage !== null) {
            console.log("Received message:");
            console.log(lastMessage);

            if (lastMessage.type === "error") {
                setAlertMessage(lastMessage.payload.message);
            }

            if (lastMessage.type === "join_room") {
                setRoom(lastMessage.payload.room);
                setPlayer(lastMessage.payload.player);
            }

            if (lastMessage.type === "update_room") {
                setRoom(lastMessage.payload);
            }
        }
    }, [lastMessage]);

    if (alertMessage !== "") {
        return (
            <Alert severity="error" variant="filled">
                {alertMessage}
            </Alert>
        )
    }

    let contents = null;

    if (gameState === GameState.LOBBY) {
        contents = <Lobby
            room={room}
            player={player}
        />;
    }

    if (gameState === GameState.RUNNING) {
        contents = <RunningGame
            room={room}
            player={player}
            sendMessage={sendMessage}
        />
    }

    if (gameState === GameState.STOPPED) {
        contents = <StoppedGame
            room={room}
            player={player}
            sendMessage={sendMessage}
        />
    }

    console.log("In state " + gameState);

    return (
        <SocketContext.Provider value={{sendMessage, lastMessage}}>
            <Container>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid container item xs={6} direction="row" justify="center">
                        {
                            gameState === GameState.NOT_JOINED ?
                                <p>Joining room...</p>
                                :
                                Object.keys(room.players).map(id => {
                                    const player = room.players[id];

                                    return (
                                        <Avatar
                                            key={id}
                                            variant="rounded"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                backgroundColor: player.id
                                            }}
                                        >
                                            {id}<br/>{room.total_points[id]} points
                                        </Avatar>
                                    )
                                })
                        }
                    </Grid>

                    <Grid item xs={6} style={{textAlign: "center"}}>
                        {contents}
                    </Grid>
                </Grid>
            </Container>
        </SocketContext.Provider>
    )
};
