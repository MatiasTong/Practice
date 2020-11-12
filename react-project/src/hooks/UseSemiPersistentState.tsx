import React, { useState, useEffect } from 'react'

const UseSemiPersistentState = (key: string, initialState: string):

[string, (newValue:string) => void] => {

    const isMounted = React.useRef(false);
    
    //the key allows the hook to be resusable and prevents overwriting local mem
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    );


    useEffect(() => {
//To increase performance, we avoid the computation of running the storage function
//for the the first render
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            console.log('A')
            localStorage.setItem(key, value);
        }

    }, [value, key])

    return [value, setValue];

}

export default UseSemiPersistentState;
