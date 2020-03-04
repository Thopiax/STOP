import React, {useState} from 'react';
import {Link} from "react-router-dom";
import env from "./Environment";
import {
  useHistory
} from "react-router-dom";

export const Home = () => {
  const [roomId, setRoomId] = useState("");

  history = useHistory();

  const joinRoom = (id) => {
    history.push("room/" + id);
  };

  const createRoom = () => {
    console.log("Starting create room call");
    fetch("http://localhost/create_room")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Call returned " + result);
          joinRoom(result.id);
        })
      .catch(
        (exception) => console.log(exception)
      );
  };

  return (
    <div>
      <h1>STOP.io</h1>
      <div>
        <label>
          <input type="text" value={roomId} onChange={(roomId) => setRoomId(roomId.toUpperCase())}/>
        </label>
        <button onClick={() => joinRoom(roomId)}>Join Room</button>
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );

};