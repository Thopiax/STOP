import React, {useState, useEffect} from "react";
import env from "./Environment";
import {useParams} from "react-router-dom";
import {Lobby} from "./Lobby";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export const Room = (props) => {
    let {roomId} = useParams();

    const [player, setPlayer] = useState({});
    const [room, setRoom] = useState({});
    const [game, setGame] = useState({running: false});
    const [categories, setCategories] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        const joinRoom = async () => {
            fetch(env.BACKEND_URL + "/join_room/" + roomId)
                .then(response => Promise.all([response.ok, response.json()]))
                .then(([responseOk, body]) => {
                    if (responseOk) {
                        setPlayer(body)
                    } else {
                        setAlertMessage(body['message'])
                    }
                })
        };

        joinRoom();
    }, [setPlayer]);

    if (alertMessage !== "") {
        return (
            <Alert severity="error" variant="filled">
                {alertMessage}
            </Alert>
        )
    }

    if (game.running) {
        return null;
    }

    return <Lobby player={player}/>;
};
