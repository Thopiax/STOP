import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import {CategorySelection} from "./CategorySelection";
import Grid from "@material-ui/core/Grid";
import SocketContext from "../SocketContext";
import TextField from "@material-ui/core/TextField";
import {CategoryList} from "./CategoryList";

const HostLobby = ({room, sendMessage}) => {

    const startGame = () => {
        sendMessage("start_round", {
            "room_id": room.id,
        })
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <CategorySelection
                    room={room}
                    sendMessage={sendMessage}
                />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => startGame()} variant="outlined">Start Game</Button>
            </Grid>
        </React.Fragment>
    );
};

const GuestLobby = ({room}) => {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <CategoryList
                    categories={room.categories}
                    categoryAnswerCount={room.category_answer_count}
                />
            </Grid>
            <Grid item xs={12}>
                <p>Waiting for host to pick categories...</p>
            </Grid>
        </React.Fragment>
    );
};

export const Lobby = ({room, player, sendMessage}) => {

    const [name, setName] = useState(player.name);
    const isHost = room.host === player.id;

    const changeName = (e) => {
        setName(e.target.value);
        sendMessage("change_name", {
            "room_id": room.id,
            "player_id": player.id,
            "new_name": e.target.value
        })
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Room {room.id}</h2>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" label="Name" value={name} onChange={changeName}/>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    {isHost ?
                        <HostLobby room={room} sendMessage={sendMessage}/>
                        :
                        <GuestLobby room={room} />}
                </Grid>
            </Grid>
        </Container>
    );
};
