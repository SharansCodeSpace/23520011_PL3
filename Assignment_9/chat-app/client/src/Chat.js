// Chat.js
import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // Send message function
    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]); // Add sent message to list
            setCurrentMessage(""); // Clear input field
        }
    };

    // Receive message event
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });

        return () => {
            socket.off("receive_message"); // Cleanup listener on unmount
        };
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>WeChat Room - {room}</p>
            </div>
            <div className="chat-body">
                <div className="message-container">
                    {messageList.map((messageContent, index) => (
                        <div
                            key={index}
                            className={`message ${username === messageContent.author ? "you" : "other"
                                }`}
                        >
                            <div className="message-body">
                                <div className={`message-content`}>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Send Message"
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    onKeyPress={(event) => {
                        if (event.key === "Enter") sendMessage(); // Send message on Enter key press
                    }}
                    autoComplete="off"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
