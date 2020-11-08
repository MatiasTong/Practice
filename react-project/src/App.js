import React, {useState} from "react"
import logo from './logo.svg';
import './App.css';
const title = "Matias"
const getTitle = () => {
  return title
}


const App = () => {
  const stories = [
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

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = event =>{
    setSearchTerm(event.target.value);
  } 

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="App">
      <h1>Hello {getTitle()}</h1>
      <Search onSearch={handleSearch} searchTerm = {searchTerm}/>
      <hr />
      <List list={searchedStories} />
    </div>
  )
};


const Search = props => {
  return(
    <div>
       <label htmlFor="search">Search: </label>
      <input onChange={props.onSearch} id="search" type="text" placeholder="search" />
      <p>Searching for <strong>{props.searchTerm}</strong></p>
    </div>
  )
}


const List = (props) => (
  props.list.map(
    (item) => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title} </a>
        </span>
        <span>{item.author} </span>
        <span>{item.num_comments} </span>
        <span>{item.points} </span>
      </div>
    ))

)

export default App;
