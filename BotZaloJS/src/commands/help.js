module.exports = {
    name: 'help',
    description: 'Hiển thị danh sách lệnh',
    async run(bot, { threadId, threadType }) {
        const helpText = `● Danh Sách Lệnh (Prefix: ${bot.prefix}):\n` +
            `● ${bot.prefix}help : Hiển thị menu này\n` +
            `● @contact: Liên hệ với HaThanh!`;
            
        await bot.replyMessage({ text: helpText }, threadId, threadType);
    }
};
