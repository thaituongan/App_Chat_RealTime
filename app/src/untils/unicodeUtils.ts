export const textToUnicode = (input: string): string => {
    let unicodeString = '';
    for (let i = 0; i < input.length; i++) {
        const unicodeChar = input.charCodeAt(i).toString(16).toUpperCase();
        unicodeString += '\\u' + '0000'.substring(0, 4 - unicodeChar.length) + unicodeChar;
    }
    return unicodeString;
};

// Hàm chuyển đổi từ mã Unicode sang văn bản thông thường
export const unicodeToText = (input: string): string => {
    return input.replace(/\\u[\dA-F]{4}/gi, (match: string) => {
        return String.fromCharCode(parseInt(match.substr(2), 16));
    });
};

export default {
    textToUnicode,
    unicodeToText,
};