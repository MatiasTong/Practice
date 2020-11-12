import React from 'react'
import InputWithLabel from './InputWithLabel'
import styles from '../App.module.css';

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};


export default function SearchForm ({ 
  searchTerm, 
  onSearchInput, 
  onSearchSubmit
}: SearchFormProps) {
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
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  )
}
