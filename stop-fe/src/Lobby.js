import React, {useState} from "react";
import {Event} from "react-socket-io";

const CategoryList = ({ categories }) => {
  return (<ul>{categories.map((category) => (<li>{category}</li>))}</ul>)
};

const HostLobby = ({ id, categories }) => {
    return (<div>
      <h2>Room Id: {id}</h2>
      <CategoryList categories={categories} />
    </div>);
};

const GuestLobby = (props) => {
    return <p>Waiting for host to pick categories...</p>
};

const onInitializeEvent = (room) => {
  return <Game room={room} />;
}

export const Lobby = ({ player: { is_host }, room}) => {
    return (
        <React.Fragment>
          {is_host ? <HostLobby room={room} /> : <GuestLobby />}
          <Event event='initialize_room' handler={onInitializeEvent} />
        </React.Fragment>
    );
};
