import React, {useState, useEffect} from "react";
import env from "./Environment";
import {useParams} from "react-router-dom";
import {Lobby} from "./Lobby";


export const Game = (props) => {
  let {roomId} = useParams();

  const [player, setPlayer] = useState({});
  const [room, setRoom] = useState({});
  const [game, setGame] = useState({
    is_running: false
  });
  const [categories, setCategories] = useState([]);

  const joinRoom = () => {
    fetch(env.BACKEND_URL + "/join_room/" + roomId)
      .then(res => res.json())
      .then((result) => {
        console.log("Successfully joined room.");
        setPlayer(result)
      })
      .catch((exception) => {
        console.warn(exception);
      });
  };

  useEffect(() => {
    console.log("Starting game effects in room " + roomId);
    joinRoom()
  });

  if (game.is_running) {
    return null;
  }

  return <Lobby player={player} room={room} />;
};
