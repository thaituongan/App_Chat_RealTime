export const saveReLoginCode = (code: string) => {
    localStorage.setItem('reloginCode', code);
};

export const getReLoginCode = () => {
    return localStorage.getItem('reloginCode');
};

export const clearReLoginCode = () => {
    localStorage.removeItem('reloginCode');
};

