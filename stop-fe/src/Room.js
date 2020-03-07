import React, {useState, useEffect} from "react";
import env from "./Environment";
import {useParams} from "react-router-dom";
import {Lobby} from "./Lobby";


export const Room = (props) => {
  let {roomId} = useParams();

  const [player, setPlayer] = useState({});
  const [room, setRoom] = useState({});
  const [game, setGame] = useState({is_running: false});
  const [categories, setCategories] = useState([]);

  const joinRoom = async () => {
    const resp = await fetch(env.BACKEND_URL + "/join_room/" + roomId);

    return resp
      .json()
      .then((player) => {
        console.log("Player successfully joined room.");
        setPlayer(player)
      })
      .catch((error) => {
        console.warn(error)
      });
  };

  useEffect(async () => {
    console.log("Starting game effects in room " + roomId);
    await joinRoom();
  });

  if (game.is_running) {
    return null;
  }

  return <Lobby player={player} />;
};
