import React, {useState} from "react";
import {Event} from "react-socket-io";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import {CategorySelection} from "./CategorySelection";

const HostLobby = ({ roomId }) => {
  const [categories, setCategories] = useState([]);

  return (<Container>
    <h2>Room {roomId}</h2>
    <CategorySelection categories={categories} setCategories={setCategories} />
    <Button onClick={() => startGame()} variant="outlined" >Start Game</Button>
  </Container>);
};

const GuestLobby = (props) => {
  return <p>Waiting for host to pick categories...</p>
};

export const Lobby = ({ player: { room_id, is_host } }) => {
  let contents = <GuestLobby/>;

  if (is_host) {
    contents = <HostLobby roomId={room_id}/>;
  }

  return (
    <Container>
      {contents}
    </Container>
  );
};
