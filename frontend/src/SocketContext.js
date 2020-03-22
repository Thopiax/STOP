import React from 'react'

const SocketContext = React.createContext();

export const makeMessage = (type, payload) => {
    return `42${JSON.stringify([type, payload])}`
};

export default SocketContext;