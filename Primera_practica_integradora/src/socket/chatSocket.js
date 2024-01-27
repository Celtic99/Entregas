const express = require ('express')
const { Server } = require('socket.io')

const initChatSocket = (httpServer) =>{
    const io = new Server(httpServer)
    const chats = []

    io.on('connection', (socket) => {
        socket.on('newUser', data => {
            socket.broadcast.emit('userConnected', data)
            socket.emit('messageLogs', chats)
        })

        socket.on('message', data =>{
            chats.push(data)

            io.emit('messageLogs', chats)
        })
    })
}

module.exports = initChatSocket