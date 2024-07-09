export const saveReLoginCode = (username: string, code: string) => {
    localStorage.setItem('reLoginCode', code);
    localStorage.setItem('username', username);
};

export const getReLoginCode = () => {
    return localStorage.getItem('reLoginCode');
};

export const getUsername = () => {
    return localStorage.getItem('username');
};

export const clearReLoginCode = () => {
    localStorage.removeItem('reLoginCode');
   // localStorage.removeItem('username');
};
