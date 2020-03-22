import React, {useCallback, useState} from "react";
import * as _ from "lodash";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {CategoryList} from "./CategoryList";
import FormControl from "@material-ui/core/FormControl";

export const CategorySelection = ({room, sendMessage}) => {
    const [currentCategory, setCurrentCategory] = useState("");
    const [categories, setCategories] = useState(room.categories);

    const addCategory = useCallback((category) => {
        const newCategories = [...categories, category];
        setCategories(newCategories);
        setCurrentCategory("");
        sendCategories(newCategories);
    }, [setCategories, setCurrentCategory, categories]);

    const removeCategory = useCallback((category) => {
        const newCategories = _.without(categories, category);
        setCategories(newCategories);
        sendCategories(newCategories);
    }, [setCategories, categories]);

    const sendCategories = (categories) => {
        sendMessage("choose_categories", {
            "room_id": room.id,
            "categories": categories,
        })
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={6}>
                <CategoryList
                    categories={categories}
                    removeCategory={removeCategory}
                    categoryAnswerCount={room.category_answer_count}
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField
                        label="Category"
                        value={currentCategory}
                        onChange={(e) => setCurrentCategory(e.target.value)}
                    />
                </FormControl>
                <Button onClick={() => addCategory(currentCategory)}>Add</Button>
            </Grid>
        </Grid>
    );
};
