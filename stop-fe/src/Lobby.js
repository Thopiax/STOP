import React, {useState} from "react";
import * as _ from "lodash";
import { Select } from '@material-ui/core';
import {
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { ClearIcon } from "@material-ui/icons";



const HostLobby = ({ room_id }) => {
  const [categories, setCategories] = useState([]);

  let categoryValue = "";

  const addCategory = (category) => {
    setCategories([...categories, category])
  };

  const removeCategory = (category) => {
    setCategories(_.without(categories, category))
  };

  const CategoryList = ({ categories }) => {
    return (
      <List>
        {categories.map((category) => (
          <ListItem>
            <ListItemText primary={category} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="clear" onClick={(cat) => removeCategory(cat)}>
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  };

  return (<div>
    <h2>Room {room_id}</h2>

    <CategoryList categories={categories} />
    <TextField label="Category" value={categoryValue}/>

  </div>);
};

const GuestLobby = (props) => {
    return <p>Waiting for host to pick categories...</p>
};

export const Lobby = ({ player: { room_id, is_host } }) => {
    return is_host ? <HostLobby player={player} /> : <GuestLobby />;
};
