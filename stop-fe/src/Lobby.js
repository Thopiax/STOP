import React, {useState} from "react";

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

export const Lobby = ({ player: { is_host }, room}) => {
    return is_host ? <HostLobby room={room} /> : <GuestLobby />;
};
