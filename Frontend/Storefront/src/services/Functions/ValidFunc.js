export const requiredField = (value) => {
    return value === '' ? 'Required' : 'ok';
}

export const emailValid = (value) => {
    return (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : 'ok');
}

export const passValid = (value) => {
    return /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^A-Za-z0-9]/.test(value) &&
        value.length > 5;
}

export const nameValid = (value) => {
    return /^[a-zA-Z]+$/.test(value)
}

export const pinValid = (value) => {
    return /^[3][8][0-9]{4}$/.test(value)
}