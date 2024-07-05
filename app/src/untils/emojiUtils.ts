export const emojiHexToEmoji = (emojiHex: string): string => {
    const emojiRegex = /:[a-fA-F0-9\-]+:/g;
    let convertedMessage = emojiHex;

    // Tìm và thay thế mỗi emojiHex trong tin nhắn bằng emoji tương ứng
    const matches = emojiHex.match(emojiRegex);
    if (matches) {
        matches.forEach(match => {
            const emojiUnified = match.slice(1, -1).split('-').map(code => parseInt(code, 16));
            const emoji = String.fromCodePoint(...emojiUnified);
            convertedMessage = convertedMessage.replace(match, emoji);
        });
    }

    return convertedMessage;
};

export default emojiHexToEmoji;