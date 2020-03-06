import React, {useState} from "react";
import * as _ from "lodash";
import {
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const HostLobby = ({ roomId }) => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
    setCurrentCategory("");
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
              <IconButton edge="end" aria-label="clear" onClick={(e) => removeCategory(category)}>
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  };

  return (<Container>
    <h2>Room {roomId}</h2>

    <CategoryList categories={categories} />
    <TextField label="Category" value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}/>
    <Button onClick={() => addCategory(currentCategory)}>Add</Button>

  </Container>);
};

const GuestLobby = (props) => {
  return <p>Waiting for host to pick categories...</p>
};

export const Lobby = ({ player: { room_id, is_host } }) => {
  let contents = <GuestLobby/>;

  if (is_host) {
    contents = <HostLobby roomId={room_id} />;
  }

  return (
    <Container>
      {contents}
    </Container>
  );
};
