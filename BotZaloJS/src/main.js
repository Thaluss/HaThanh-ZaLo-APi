/**
 * BotZaloJavaScript - Main Entry Point
 * Copyright (c) 2026 Hathanh
 */

const { HaThanh } = require('./bot');
const Logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');

async function main() {
    Logger.banner();
    Logger.info("Starting Hathanh Zalo Bot...");

    const configPath = path.join(__dirname, '..', 'config.json');
    if (!fs.existsSync(configPath)) {
        Logger.error("config.json not found!");
        process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    const bot = new HaThanh(config);

    bot.onMessage((mid, authorId, message, messageObject, threadId, threadType) => {
        bot.onMessageReceived(mid, authorId, message, messageObject, threadId, threadType);
    });
    try {
        const loggedIn = await bot.login();
        if (loggedIn) {
            Logger.success("Bot is online and listening for messages!");
            bot.listen();
        } else {
            Logger.error("Login failed. Please check your credentials.");
        }
    } catch (e) {
        Logger.error("Critical error during startup: " + e.message);
    }
}

main();
