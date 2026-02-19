import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Layout from './layouts/Layout';
import UserList from './components/UserList';
import RoomList from './components/RoomList';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState('Général'); // Default room (French)
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeRooms, setActiveRooms] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const messagesEndRef = useRef(null);

  // 1. Init Socket only once
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  // 2. Setup Listeners
  useEffect(() => {
    if (!socket) return;

    // Remove duplicates by defining handlers
    const onConnect = () => socket.emit('get_rooms');
    const onReceiveMessage = (data) => setMessages((prev) => [...prev, data]);
    const onMessageHistory = (history) => setMessages(history); // Replace entire history
    const onRoomList = (data) => setActiveRooms(data);
    const onRoomUsers = (data) => setUsersInRoom(data);

    // Attach
    socket.on('connect', onConnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('message_history', onMessageHistory);
    socket.on('room_list', onRoomList);
    socket.on('room_users', onRoomUsers);

    // Cleanup listeners to prevent duplicates
    return () => {
      socket.off('connect', onConnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('message_history', onMessageHistory);
      socket.off('room_list', onRoomList);
      socket.off('room_users', onRoomUsers);
    };
  }, [socket]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (targetRoom = room) => {
    if (username && targetRoom && socket) {
      setRoom(targetRoom);
      socket.emit('join_room', { room: targetRoom, username });
      setIsJoined(true);
      // Do NOT clear messages here manually, allow 'message_history' event to handle it
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() && socket) {
      const messageData = {
        room,
        username,
        message: currentMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  const renderJoinModal = () => (
    <div className="chat__modal-overlay">
      <div className="chat__join-form">
        <h2>Bienvenue sur BriefChat</h2>
        <p style={{ color: '#949ba4' }}>Entrez votre pseudo pour commencer.</p>

        <div className="chat__input-group">
          <label className="chat__label">PSEUDO</label>
          <input
            className="chat__input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
            autoFocus
          />
        </div>

        <button
          className="chat__button"
          onClick={() => handleJoin()}
          disabled={!username}
        >
          Rejoindre
        </button>
      </div>
    </div>
  );

  return (
    <Layout
      headerTitle={`# ${room}`}
      leftSidebar={
        <RoomList
          rooms={activeRooms}
          activeRoom={room}
          onJoin={(r) => handleJoin(r)}
          onCreate={() => {
            const newRoom = prompt("Nom du nouveau salon :");
            if (newRoom) handleJoin(newRoom);
          }}
        />
      }
      rightSidebar={isJoined ? <UserList users={usersInRoom} /> : null}
    >
      {!isJoined && renderJoinModal()}

      <div className="chat">
        <div className="chat__messages">
          {messages.map((msg, idx) => {
            if (msg.user === 'Système' || msg.user === 'System') {
              return (
                <div key={idx} className="chat__message chat__message--system">
                  {msg.text}
                </div>
              );
            }
            return (
              <div key={idx} className="chat__message">
                <div className="chat__message-avatar"></div>
                <div className="chat__message-content">
                  <div className="chat__message-header">
                    <span className="chat__message-username">{msg.user}</span>
                    <span className="chat__message-time">
                      {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="chat__message-text">{msg.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat__controls">
          <div className="chat__input-wrapper">
            <input
              className="chat__input"
              style={{ background: 'transparent', height: '44px' }}
              type="text"
              placeholder={`Envoyer un message dans #${room}`}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!isJoined}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
