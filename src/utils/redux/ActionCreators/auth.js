export const setLogintrue = (data) => {
    return {
        type: "LOGIN_TRUE",
        data
    }
}

export const setLoginfalse = () => {
    return {
        type: "LOGIN_FALSE",
    }
}