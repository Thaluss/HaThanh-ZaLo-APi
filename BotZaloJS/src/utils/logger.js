/**
 * Professional Logger Utility
 * Provides color-coded, structured logging
 */

const COLORS = {
    RESET: '\x1b[0m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',

    // Foreground
    BLACK: '\x1b[30m',
    WHITE: '\x1b[37m',

    // Background
    BG_BLUE: '\x1b[44m',
    BG_GREEN: '\x1b[42m',
    BG_YELLOW: '\x1b[43m',
    BG_CYAN: '\x1b[46m',
    BG_MAGENTA: '\x1b[45m',
    BG_RED: '\x1b[41m',
};

class Logger {
    static timestamp() {
        return new Date().toLocaleTimeString();
    }

    static message(authorId, threadId, threadType, message) {
        const time = this.timestamp();
        const msgDisplay = typeof message === 'string' ? message : `[${Object.keys(message).join(', ')}]`;

        const typeTag = threadType === 'GROUP'
            ? `${COLORS.BG_BLUE}${COLORS.WHITE} GROUP ${COLORS.RESET}`
            : `${COLORS.BG_GREEN}${COLORS.BLACK} PRIVATE ${COLORS.RESET}`;

        const userTag = `${COLORS.BG_YELLOW}${COLORS.BLACK} USER:${authorId} ${COLORS.RESET}`;
        const threadTag = threadType === 'GROUP'
            ? `${COLORS.BG_CYAN}${COLORS.BLACK} THREAD:${threadId} ${COLORS.RESET}`
            : `${COLORS.BG_MAGENTA}${COLORS.WHITE} THREAD:${threadId} ${COLORS.RESET}`;

        console.log(`${COLORS.DIM}[${time}]${COLORS.RESET} ${typeTag} ${userTag} ${COLORS.DIM}→${COLORS.RESET} ${threadTag} \x1b[32m${msgDisplay}${COLORS.RESET}`);
    }

    static info(message) {
        const time = this.timestamp();
        console.log(`${COLORS.DIM}[${time}]${COLORS.RESET} ${COLORS.BG_BLUE}${COLORS.WHITE} INFO ${COLORS.RESET} ${message}`);
    }

    static success(message) {
        const time = this.timestamp();
        console.log(`${COLORS.DIM}[${time}]${COLORS.RESET} ${COLORS.BG_GREEN}${COLORS.BLACK} SUCCESS ${COLORS.RESET} ${message}`);
    }

    static warn(message) {
        const time = this.timestamp();
        console.log(`${COLORS.DIM}[${time}]${COLORS.RESET} ${COLORS.BG_YELLOW}${COLORS.BLACK} WARN ${COLORS.RESET} ${message}`);
    }

    static error(message) {
        const time = this.timestamp();
        console.log(`${COLORS.DIM}[${time}]${COLORS.RESET} ${COLORS.BG_RED}${COLORS.WHITE} ERROR ${COLORS.RESET} ${message}`);
    }

    static banner() {
        console.log('\n' + COLORS.BRIGHT + COLORS.BG_BLUE + COLORS.WHITE);
        console.log('╔═══════════════════════════════════════╗');
        console.log('║                                       ║');
        console.log('║        HATHANH ZALO BOT v1.0          ║');
        // console.log('║     Professional Bot Framework       ║');
        console.log('║                                       ║');
        console.log('╚═══════════════════════════════════════╝');
        console.log(COLORS.RESET + '\n');
    }
}

module.exports = Logger;
