import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import {CategorySelection} from "./CategorySelection";
import Grid from "@material-ui/core/Grid";
import SocketContext from "./SocketContext";

const HostLobby = ({room, sendMessage}) => {
    const [categories, setCategories] = useState([]);

    const startGame = () => {
        sendMessage("start_round", {
            "room_id": room.id,
            "categories": categories
        })
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h2>Room {room.id}</h2>
            </Grid>
            <Grid item xs={12}>
                <CategorySelection categories={categories} setCategories={setCategories}/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => startGame()} variant="outlined">Start Game</Button>
            </Grid>
        </Grid>
    );
};

const GuestLobby = (props) => {
    return <p>Waiting for host to pick categories...</p>
};

export const Lobby = ({room, player}) => {

    const isHost = room.host === player.id;

    return (
        <SocketContext.Consumer>
            { ({sendMessage, lastMessage}) =>
                <Container>
                    {isHost ? <HostLobby room={room} sendMessage={sendMessage}/> : <GuestLobby/>}
                </Container>
            }
        </SocketContext.Consumer>
    );
};
