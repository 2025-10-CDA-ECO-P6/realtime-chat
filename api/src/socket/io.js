const rooms = new Map();

const getPublicRoomList = () => {
    return Array.from(rooms.entries()).map(([name, data]) => ({
        name,
        count: data.messages.length
    }));
};

module.exports = (io) => {
    io.on('connection', (socket) => {

        socket.emit('room_list', getPublicRoomList());

        socket.on('get_rooms', () => {
            socket.emit('room_list', getPublicRoomList());
        });

        socket.on('join_room', ({ room, username }) => {
            const previousRoom = socket.data.room;
            if (previousRoom && previousRoom !== room) {
                socket.leave(previousRoom);
                if (rooms.has(previousRoom)) {
                    rooms.get(previousRoom).users.delete(socket.id);

                    const prevUsers = Array.from(rooms.get(previousRoom).users.values());
                    io.to(previousRoom).emit('room_users', prevUsers);
                }
            }

            socket.join(room);
            socket.data.room = room;
            socket.data.username = username;

            if (!rooms.has(room)) {
                rooms.set(room, {
                    users: new Map(),
                    messages: []
                });
            }

            const roomData = rooms.get(room);
            roomData.users.set(socket.id, username);

            socket.emit('message_history', roomData.messages);

            io.emit('room_list', getPublicRoomList());

            const usersInRoom = Array.from(roomData.users.values());
            io.to(room).emit('room_users', usersInRoom);

            socket.to(room).emit('receive_message', {
                user: 'Système',
                text: `${username} a rejoint le salon.`,
                timestamp: new Date().toISOString()
            });
        });

        socket.on('send_message', (data) => {
            const { room, message, username } = data;

            if (!rooms.has(room)) return;

            const msgData = {
                user: username,
                text: message,
                timestamp: new Date().toISOString()
            };

            const roomMsgs = rooms.get(room).messages;
            roomMsgs.push(msgData);
            if (roomMsgs.length > 50) roomMsgs.shift();

            io.to(room).emit('receive_message', msgData);

            io.emit('room_list', getPublicRoomList());
        });

        socket.on('disconnect', () => {
            const { room, username } = socket.data;

            if (room && rooms.has(room)) {
                const roomData = rooms.get(room);
                roomData.users.delete(socket.id);

                if (roomData.users.size !== 0) {
                    const usersInRoom = Array.from(roomData.users.values());
                    io.to(room).emit('room_users', usersInRoom);

                    io.to(room).emit('receive_message', {
                        user: 'Système',
                        text: `${username} a quitté le salon.`,
                        timestamp: new Date().toISOString()
                    });
                }

                io.emit('room_list', getPublicRoomList());
            }
        });
    });
};
