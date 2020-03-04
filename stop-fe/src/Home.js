import React, {useState, useEffect} from 'react';
import env from "./Environment";
import {useHistory} from "react-router-dom";

export const Home = () => {
  const [roomId, setRoomId] = useState("");

  let history = useHistory();

  const joinRoom = (id) => {
    history.push("room/" + id);
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
    <div>
      <h1>STOP.io</h1>
      <div>
        <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value.toUpperCase())} />
        <button onClick={() => joinRoom(roomId)}>Join Room</button>
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );
};