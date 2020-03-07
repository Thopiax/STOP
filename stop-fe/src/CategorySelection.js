import React, {useState} from "react";
import * as _ from "lodash";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export const CategorySelection = ({ categories, setCategories }) => {
  const [currentCategory, setCurrentCategory] = useState("");

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
    <CategoryList categories={categories} />
    <TextField label="Category" value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}/>
    <Button onClick={() => addCategory(currentCategory)}>Add</Button>
  </Container>);
};
