import React, {useState, useEffect} from 'react';
import env from "./Environment";
import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {HomeButton, HomeContainer, HomeContent, HomeFormContainer, HomeTexField, HomeTitle} from "./Components";
import Button from "@material-ui/core/Button";

export const Home = () => {
  const [roomId, setRoomId] = useState("");

  let history = useHistory();

  const joinRoom = (id) => {
    history.push("room/" + id);
  };

  const onEvent = (payload) => {
    console.log(payload);
  };

  const createRoom = () => {
    console.log("[CreateRoom] Started call");

    fetch(env.BACKEND_URL + "/create_room")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("[CreateRoom] Successfully returned call", result);
          joinRoom(result.id);
        })
      .catch(
        (exception) => console.error(exception)
      );
  };

  return (
    <HomeContainer>
      <HomeTitle>STOP.io</HomeTitle>
      <HomeContent>
        <form style={{display: "flex"}} noValidate autoComplete="off">
          <TextField variant="outlined" label="Room Id" value={roomId} onChange={(e) => setRoomId(e.target.value.toUpperCase())} />
          <Button variant="outlined" disabled={roomId === ""} onClick={() => joinRoom(roomId)}>Join Room</Button>
        </form>
        <hr />
        <form noValidate autoComplete="off">
          <Button style={{width: "100%"}} variant="outlined" onClick={createRoom}>Create Room</Button>
        </form>
    </HomeContent>
    </HomeContainer>
  );
};
