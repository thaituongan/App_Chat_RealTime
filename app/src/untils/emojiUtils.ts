export const emojiHexToEmoji = (emojiHex: string): string => {
    const emojiRegex = /:[a-fA-F0-9\-]+:/g;
    let convertedMessage = emojiHex;
    let match;

    // Tạo một mảng các matches và thay thế từng cái một
    const matches = emojiHex.match(emojiRegex);

    if (matches) {
        matches.forEach(match => {
            const emojiUnified = match.slice(1, -1).split('-').map(code => parseInt(code, 16));
            const emoji = String.fromCodePoint(...emojiUnified);
            convertedMessage = convertedMessage.split(match).join(emoji);
        });
    }

    return convertedMessage;
};


export default emojiHexToEmoji;