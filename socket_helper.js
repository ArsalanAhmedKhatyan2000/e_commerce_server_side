
exports.socketHelper = (socket) => {
    socket.on("joinRoom", (data) => {
        const { room, name } = data
        socket.join(room)
        socket.to(room).emit("userJoinded", name)
    })

    socket.on("leaveRoom", (data) => {
        const { room, name } = data;
        socket.leave(room);
        socket.to(room).emit("userLeft", name);
    })

}