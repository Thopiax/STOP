import {Route} from "react-router-dom";
import React from "react";


export const RoomCreate = (props) => {

    history = useHistory();

    const fetchRoom = () => {
        console.log("Starting create room call");
        fetch("http://localhost/create_room")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Call returned " + result);
                    setRoom(result);
                    history.push("/" + result.id)
                })
            .catch(
                (exception) => console.log(exception)
            );
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>STOP</h1>
                <button onClick={fetchRoom}>Create Room</button>
            </header>
        </div>
    );
};
