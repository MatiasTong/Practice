import React from 'react'
import Item from "./Item"

export default function List({ list, onRemoveItem }) {
    return (
        list.map(
            //rest operator
            item => (
                //spread operator or you can just pass the whole item obj as a prop
                <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
            ))
    )
}

