import React, { useState } from 'react';
import env from './Environment';

class GuestLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    let roomId = event.target.value;

    fetch(`${env.BACKEND_URL}/join_room/${roomId}`, {
      method: 'POST'
    }).then(function (resp) {
      console.log("Successfully joined room.")

    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Room ID
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const GuestLobby = () => {
  return ()
};

export default ;