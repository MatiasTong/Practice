import React, {useState, useEffect} from 'react'

export default function UseSemiPersistentState(key, initialState) {
    //the key allows the hook to be resusable and prevents overwriting local mem
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    );

    useEffect(()=>{
        localStorage.setItem(key, value);
    }, [value, key])
    
    return [value, setValue];

}
