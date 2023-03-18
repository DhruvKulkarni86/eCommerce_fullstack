export const ErrorFunc = (error, setError, setEmailErr, setPassErr) => {
    switch (error.code) {
        case 'auth/user-not-found':
            setError('Invalid Email')
            setEmailErr(true)
            break;
        
        case 'auth/wrong-password':
            setError('Incorrect Password')
            setPassErr(true)
            break;    

        default:
            break;
    }
}