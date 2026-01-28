const fs = require('fs');
const path = require('path');
const Logger = require('../utils/logger');

class CommandHandler {
    constructor(bot) {
        this.bot = bot;
        this.commands = new Map();
        this.loadCommands();
    }

    loadCommands() {
        const commandsPath = path.join(__dirname, '..', 'commands');
        if (!fs.existsSync(commandsPath)) {
            fs.mkdirSync(commandsPath, { recursive: true });
        }

        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            try {
                const command = require(path.join(commandsPath, file));
                if (command.name && typeof command.run === 'function') {
                    this.commands.set(command.name, command);
                    Logger.success(`Loaded command: ${command.name}`);
                }
            } catch (error) {
                Logger.error(`Failed to load command from ${file}: ${error.message}`);
            }
        }
    }

    async handle(mid, authorId, message, messageObject, threadId, threadType) {
        if (!message.startsWith(this.bot.prefix)) return;

        const args = message.slice(this.bot.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = this.commands.get(commandName);

        if (command) {
            try {
                await command.run(this.bot, { mid, authorId, message, messageObject, threadId, threadType, args });
            } catch (error) {
                Logger.error(`Error executing command ${commandName}: ${error.message}`);
                await this.bot.replyMessage(`💥 Có lỗi xảy ra khi thực hiện lệnh ${commandName}.`, threadId, threadType);
            }
        }
    }
}

module.exports = CommandHandler;
