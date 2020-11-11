import React, { useState, useCallback, useEffect, useRef, useReducer } from "react"
import useSemiPersistentState from "./hooks/UseSemiPersistentState"
import storiesReducer from "./reducers/storiesReducer"
import SearchForm from "./components/SearchForm"
import List from "./components/List"
import axios from 'axios'
import styles from './App.module.css';
const title = "Matias"
const getTitle = () => {
  return title
}
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='



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

  // const getAsyncStories = () =>
  //   new Promise(resolve =>
  //     setTimeout(
  //       () => resolve({ data: { stories: initialStories } }),
  //       2000
  //     )
  //   )
  //The custom hook takes in a key and initial state
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  // You can combine the following in the useReducer hook to prevent impossible states
  //this is better practice
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState(false)
  const [stories, dispatchStories] = useReducer(storiesReducer,
    { data: [], isLoading: false, isError: false });

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' })
    try {
      const result = await axios.get(url);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch{
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);


  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories])


  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  }

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }
  const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()))


  return (
    <div className={styles.container}>
      <h1>Hello {getTitle()}</h1>
      <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
      <SearchForm 
      searchTerm={searchTerm}
      onSearchInput={handleSearchInput}
      onSearchSubmit={handleSearchSubmit}
      />
     
    
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (

          <List
            list={stories.data}
            onRemoveItem={handleRemoveStory}
          />

        )

      }
    </div>
  )
};


// const Item = ({ item, onRemoveItem }) => {
//   return (
//     <>
//       <span>
//         <a href={item.url}> {item.title} </a>
//       </span>
//       <span>{item.author} </span>
//       <span>{item.num_comments} </span>
//       <span>{item.points} </span>
//       <span>
//         <button type="button" onClick={() => onRemoveItem(item)}>
//           Dismiss
//       </button>
//       </span>
//     </>

//   )

// }

export default App;
