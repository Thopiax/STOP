import * as React from "react";

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: "",
            host: null,
            categories: []
        };

        this.fetchRoom();
        this.joinRoom(this.state.roomID);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    fetchRoom() {
        console.log("Starting create room call");
        fetch("http://localhost/create_room")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Call returned " + result);
                    this.setState({
                        roomid: result
                    });
                },
                (error) => {
                    this.fetchRoom();
                }
            )
    }

    joinRoom(roomID) {
        //Do something
    }

    addCategory() {

    }

    render() {
        return (
            <div>
                Your room is: {this.state.roomID}
                <input type="text" id ="categoryInput" />
                <input type="submit" onClick={this.addCategory()}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Lobby />,
    document.getElementById('root')
);
