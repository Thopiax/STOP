import React, {useState} from "react";
import * as _ from "lodash";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export const CategorySelection = ({categories, setCategories}) => {
    const [currentCategory, setCurrentCategory] = useState("");

    const addCategory = (category) => {
        setCategories([...categories, category]);
        setCurrentCategory("");
    };

    const removeCategory = (category) => {
        setCategories(_.without(categories, category))
    };

    const CategoryList = ({categories}) => {
        return (
            <List>
                {categories.map((category) => (
                    <ListItem key={category}>
                        <ListItemText primary={category}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="clear" onClick={(e) => removeCategory(category)}>
                                <ClearIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <CategoryList categories={categories}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Category" value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}/>
                <Button onClick={() => addCategory(currentCategory)}>Add</Button>
            </Grid>
        </Grid>
    );
};
