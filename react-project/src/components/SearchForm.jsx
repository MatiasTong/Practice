import React from 'react'
import InputWithLabel from './InputWithLabel'
import styles from '../App.module.css';


export default function SearchForm({searchTerm, onSearchInput, onSearchSubmit}) {
    return (
       
             <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        //below is the same as isFocused = {true}
        isFocused
        onInputChange={onSearchInput}
        value={searchTerm}>
        <strong>Search: </strong>
      </InputWithLabel>
      <button type="submit" disabled={!searchTerm} onClick={onSearchSubmit}>
        Submit
      </button>
      </form>
       
    )
}
