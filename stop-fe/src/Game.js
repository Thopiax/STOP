import * as React from "react";

export const Game = (props) => {

    useEffect(() => {
        // API call to /join_room
    });

    const [room, setRoom] = useState({});
    const [host, setHost] = useState({});
    const [categories, setCategories] = useState([]);

    var contents = null;

    if (props.game.is_running) {
        contents = null;
    } else {
        contents = <Lobby/>
    }

    return contents
};
