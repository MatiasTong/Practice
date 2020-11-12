import React, {useEffect, useRef } from "react"

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;

}

export default function InputWithLabel({
    id, value, type = "text", onInputChange, isFocused, children }:
    InputWithLabelProps) {
    //imperative way of setting focus on the input field
    //useREf returns a ref object which stays intact over the component's lifetime but it has a property called current which 
    //in contrast to the ref object can be changed.
    //the ref object is passed to the ref attribute which set the element instance to be the current property
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      // only focus when isFocused is true and current property is existent
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused])
  
    return (
      <>
        <label htmlFor={id}>{children}</label>
        <input ref={inputRef} onChange={onInputChange} value={value} id={id} type={type} autoFocus={isFocused} />
        <p>Searching for <strong>{value}</strong></p>
      </>
    )
  }
  
