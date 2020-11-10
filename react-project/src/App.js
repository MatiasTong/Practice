import React, {useState, useEffect, useRef} from "react"
import useSemiPersistentState from "./hooks/UseSemiPersistentState"
import logo from './logo.svg';
import './App.css';
const title = "Matias"
const getTitle = () => {
  return title
}


const App = () => {
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://reactjs.org',
      author: 'Dan Abramov',
      num_comments: 2,
      points: 4,
      objectID: 1,
    },

  ]

  const getAsyncStories = () =>
  Promise.resolve({data:{stories: initialStories}})
  //The custom hook takes in a key and initial state
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  const [stories, setStories] = useState(initialStories)

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    )
    setStories(newStories);
  }
  
  const handleSearch = event =>{
    setSearchTerm(event.target.value);
  } 
  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()))

  
  return (
    <div className="App">
      <h1>Hello {getTitle()}</h1>
      <InputWithLabel 
      id="search" 
      //below is the same as isFocused = {true}
      isFocused
      onInputChange={handleSearch} 
      value={searchTerm}>
    <strong>Search: </strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    </div>
  )
};



function InputWithLabel ({
  id, label, value, type ="text", onInputChange, isFocused, children}){
  //imperative way of setting focus on the input field
  //useREf returns a ref object which stays intact over the component's lifetime but it has a property called current which 
  //in contrast to the ref object can be changed.
  //the ref object is passed to the ref attribute which set the element instance to be the current property
  const inputRef = useRef();

  useEffect(()=>{
    // only focus when isFocused is true and current property is existent
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  }, [isFocused])

  return(
    <>
       <label htmlFor={id}>{children}</label>
      <input ref={inputRef} onChange={onInputChange} value={value} id={id} type={type} autoFocus={isFocused}/>
      <p>Searching for <strong>{value}</strong></p>
    </>
  )
}


const List = ({list, onRemoveItem}) => (
  list.map(
    //rest operator
    item => (
      //spread operator or you can just pass the whole item obj as a prop
      <Item key = {item.objectID} item={item} onRemoveItem={onRemoveItem}  />
    ))

)

const Item = ({item, onRemoveItem}) =>{
  return(
    <>
    <span>
      <a href={item.url}> {item.title} </a>
    </span>
    <span>{item.author} </span>
    <span>{item.num_comments} </span>
    <span>{item.points} </span>
    <span>
      <button type ="button" onClick = {()=>onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </>

  )

}

export default App;
