import logo from './logo.svg';
import './App.css';
const title = "Matias"
const getTitle = ()=>{
  return title
}


function App() {
  return (
    <div className="App">
       <h1>Hello {getTitle()}</h1>
       <label htmlFor="search">Search: </label>
       <input id= "search" type ="text" placeholder="search"/>
    </div>
  );
}

export default App;
