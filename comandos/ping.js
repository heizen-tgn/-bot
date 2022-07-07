module.exports = (client, message, args) => {
    message.reply(client.ws.ping + 'ms')
}