import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

export const CategoryList = ({categories, categoryAnswerCount, removeCategory}) => {
    return (
        <List dense>
            {categories.map((category) => {
                const answerCount = categoryAnswerCount[category];

                return <ListItem key={category}>
                    <ListItemText
                        primary={category}
                        secondary={answerCount + " answer" + (answerCount !== 1 ? "s" : "")}
                    />
                    {removeCategory === undefined ? null :
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="clear" onClick={(e) => removeCategory(category)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            })}
        </List>
    );
};