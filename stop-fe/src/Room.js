import React, {useEffect, useState} from "react";
import env from "./Environment";
import {useParams} from "react-router-dom";
import {Lobby} from "./Lobby";
import Alert from "@material-ui/lab/Alert";
import {ReadyState, useSocketIO} from "react-use-websocket";
import {makeMessage} from "./SocketContext";
import SocketContext from "./SocketContext";
import {RunningGame} from "./RunningGame";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";


export const Room = (props) => {
    let {roomId} = useParams();

    const [player, setPlayer] = useState({});
    const [room, setRoom] = useState({running: false, players: {}});
    const [alertMessage, setAlertMessage] = useState("");
    const [sendSocketIOMessage, lastMessage, readyState] = useSocketIO(env.WEBSOCKET_URL);

    const sendMessage = (type, payload) => {
        return sendSocketIOMessage(makeMessage(type, payload));
    };

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
    }[readyState];

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendMessage("join_room", roomId);
        }
    }, [setPlayer, roomId, readyState]);

    useEffect(() => {
        if (lastMessage !== null) {
            console.log("Received message:");
            console.log(lastMessage);
            if (lastMessage.type === "join_room") {
                setRoom(lastMessage.payload.room);
                setPlayer(lastMessage.payload.player);
            }
            if (lastMessage.type === "start_round") {
                setRoom(lastMessage.payload);
            }
            if (lastMessage.type === "error") {
                setAlertMessage(lastMessage.payload.message);
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

    console.log(room);

    const contents = room.running ? <RunningGame room={room} player={player}/> : <Lobby room={room} player={player}/>;

    return (
        <SocketContext.Provider value={{sendMessage, lastMessage}}>
            <Container>
                <Grid
                    container
                    direction="column"
                    xs={12}
                    spacing={3}
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        {
                            Object.keys(room.players).map(id => {
                                const player = room.players[id];

                                return (
                                    <Avatar
                                        id={id}
                                        variant="rounded"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            backgroundColor: player.id
                                        }}
                                    >
                                        {id}<br/>{player.points} points
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
