export const isValidEmail = email => {
    return email.match(/^\w+(\.\w+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2}){0,1}$/);
};

export const isValidPassword = password =>{
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
}