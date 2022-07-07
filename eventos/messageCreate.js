var prefix = process.env.PREFIX

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.comandos.get(command);
    if (!cmd) return;

    cmd(client, message, args);
}