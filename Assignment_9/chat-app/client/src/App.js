// App.js
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

// Initialize Socket.io client
const socket = io.connect(`http://localhost:3001`);

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    // Join chat room
    const joinRoom = () => {
        if (username && room) {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>WeChat</h3>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        onChange={(event) => setUsername(event.target.value)}
                        autoComplete="off"
                    />
                    <br />
                    <label htmlFor="username">Room ID</label>
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={(event) => setRoom(event.target.value)}
                        autoComplete="off"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default App;
