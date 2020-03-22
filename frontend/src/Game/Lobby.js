import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import {CategorySelection} from "./CategorySelection";
import Grid from "@material-ui/core/Grid";
import SocketContext from "../SocketContext";
import TextField from "@material-ui/core/TextField";

const HostLobby = ({room, sendMessage}) => {
    const [categories, setCategories] = useState([]);

    const startGame = () => {
        sendMessage("start_round", {
            "room_id": room.id,
            "categories": categories
        })
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <CategorySelection categories={categories} setCategories={setCategories}/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => startGame()} variant="outlined">Start Game</Button>
            </Grid>
        </React.Fragment>
    );
};

const GuestLobby = (props) => {
    return <p>Waiting for host to pick categories...</p>
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
                    {isHost ? <HostLobby room={room} sendMessage={sendMessage}/> : <GuestLobby/>}
                </Grid>
            </Grid>
        </Container>
    );
};
