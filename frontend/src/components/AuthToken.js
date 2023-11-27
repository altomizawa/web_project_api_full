import {useEffect, useState} from 'react'


function SetAuthToken(token) {
    const [authToken, setAuthToken] = useState(null)
    setAuthToken='hello'
    return authToken
};

export {SetAuthToken}