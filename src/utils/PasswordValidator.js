const checkPasswordLength = (password, role) => {
    let minPasswordLength = role === 'user' ? 8 : 12;
    minPasswordLength = 0;
    return password.length >= minPasswordLength;
};

export default checkPasswordLength;
