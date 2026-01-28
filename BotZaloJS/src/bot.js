const { HathanhBot } = require('hathanh-zalo-api');
const fs = require('fs');
const path = require('path');
const CommandHandler = require('./handlers/commandHandler');
const Logger = require('./utils/logger');

class HaThanh extends HathanhBot {
    constructor(config) {
        super(config);
        this.loadConfig();
        // this.loadExcludedData();

        this.processedMsgIds = new Set();
        this.prefix = ">";
        this.commandHandler = new CommandHandler(this);
    }

    loadConfig() {
        try {
            const configPath = path.join(__dirname, '..', 'config.json');
            this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e) {
            console.error("❌ Error loading config.json", e);
        }
    }

    // loadExcludedData() {
    //     try {
    //         const databotPath = path.join(__dirname, '..', 'databot.json');
    //         if (fs.existsSync(databotPath)) {
    //             const data = JSON.parse(fs.readFileSync(databotPath, 'utf8'));
    //             this.prefix = data.prefix || ">";
    //         } else {
    //             this.prefix = ">";
    //         }
    //     } catch (e) {
    //         this.prefix = ">";
    //     }
    // }

    isOwner(authorId) {
        return this.ownerIds.has(authorId) || this.ownerIds.has(String(authorId));
    }

    async onMessageReceived(mid, authorId, message, messageObject, threadId, threadType) {
        Logger.message(authorId, threadId, threadType, message);

        if (typeof message !== 'string') return;
        if (this.processedMsgIds.has(mid)) return;
        this.processedMsgIds.add(mid);

        if (this.processedMsgIds.size > 1000) {
            const first = this.processedMsgIds.values().next().value;
            this.processedMsgIds.delete(first);
        }

        // Handle commands through the handler
        await this.commandHandler.handle(mid, authorId, message, messageObject, threadId, threadType);
    }
}

module.exports = { HaThanh };
