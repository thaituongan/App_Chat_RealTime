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
export const saveSelectedUser = (userSelected: string, userType: string)=>{
    localStorage.setItem('userSelected', userSelected)
    localStorage.setItem('userType', userType)
};
export const getUserType =() => {
    return localStorage.getItem('userType');
};
export const getUserSelected =() => {
    return localStorage.getItem('userSelected');
};



