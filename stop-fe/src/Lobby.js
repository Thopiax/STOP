import * as React from "react";

const Lobby = (props) => {

    if (props.player.is_host) {
        contents = <div>
            Your room is: {this.state.roomID}
            <input type="text" id ="categoryInput" />
            <input type="submit" onClick={this.addCategory()}/>
        </div>
    } else {
        contents = <p>Waiting for host to pick categories...</p>
    }

    return (
        {contents}
    );
}
