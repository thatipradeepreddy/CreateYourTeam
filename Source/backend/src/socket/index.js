export default (socket, io) => {
    console.log("New client connected:", socket.id)

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id)
    })

    setInterval(() => {
        socket.emit("stockUpdate", { symbol: "AAPL", price: Math.random() * 100 })
    }, 5000)
}
