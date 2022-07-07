module.exports = (client, message, args) => {
    message.channel.send({
        content: args.join(' ')
    })
}