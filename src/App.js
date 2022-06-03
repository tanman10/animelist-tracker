import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AnimeList from './components/AnimeList';
import Hub from './components/Hub';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './components/Edit';

function App() {

  const [text, setText] = useState([])

  useEffect(()=> { // useEffect, want this to happen when the page loads
    const getAnime = async() => {
      const tasksFromServer = await myFetchTasks('http://localhost:5000/posts') // we need to await any promise
      setText(tasksFromServer) 
    }
    getAnime()
  }, []) //dependency arry added here for some reason

  const myFetchTasks = async (link) => {
    const res = await fetch(link) //fetch (builtin) returns a promise 
    const data = await res.json()
    return data
  }

  const addAnime = async (texts) => {
    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(texts)
    })
    const data = await res.json()
    setText([...text,data])
  }

  const deleteAnime = async (id) => {
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'Delete'
    })
    setText(text.filter((anime)=> anime.id !== id))
  }

  const deleteAll = async (text) => {
    // console.log(text)
    // await text.map((ani)=> (
    //   console.log(ani.id),
    //   deleteALL2(ani.id)
    // ))
    // setText([])
  }

  const deleteALL2 = async (id) => {
    // await fetch(`http://localhost:5000/posts/${id}`, {
    //     method: 'Delete'
    //   })  
  }

  const reset = async (text) => {
    // deleteAll(text)
    // addAnime({ id: 1, name: 'One Piece', score: 10, comment: '', favorite: true,})
    // addAnime({ id: 2, name: 'Naruto', score: 10, comment: '', favorite: true,})
    // addAnime({ id: 3, name: 'Bleach', score: 10, comment: '', favorite: true,})
  }

  const sortAnime = async () => {
    const tasksFromServer = await myFetchTasks('http://localhost:5000/posts?_sort=name,id') // comma to use 2nd sort
    setText(tasksFromServer)// sorting does not persist in the backend 
  }

  const searchAnime = async (word) => {
    const tasksFromServer = await myFetchTasks(`http://localhost:5000/posts?name_like=${word}`) // comma to use 2nd sort
    setText(tasksFromServer)
  }


  const onLike = async (id) => {
    const taskToToggle = await myFetchAnime(id)
    const updTask = {...taskToToggle, favorite: !taskToToggle.favorite}
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
  
    setText(text.map((task)=>
      task.id === id ? {...task,favorite : data.favorite} : task))
  }
  
  const myFetchAnime = async (id) => {
    const res = await fetch(`http://localhost:5000/posts/${id}`) 
    const data = await res.json()
    return data
  }


  const editAnime = async (array) => {
    const id = array.num
    const taskToToggle = await myFetchAnime(id)
    const updTask = {...taskToToggle, name: array.name, rate: array.rate, comment: array.comment, favorite: array.favorite, image: array.image}
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
  
    setText(text.map((task)=>
      task.id === id ? {...task, name: data.name, rate: data.rate, comment: data.comment, favorite : data.favorite, image: data.image} : task))
  }


  return (
    <BrowserRouter>
      <div className='container'> 
        <Header title = "Anime"></Header>
        <Routes>
          <Route path = '/' element = {
            <>
              <SearchBar onSearch = {searchAnime}></SearchBar>
              <div className='container2'>
                <Hub text = {text} onAdd = {addAnime} onDelete = {deleteAll} onReset = {reset} onSort = {sortAnime}></Hub>
                <AnimeList text = {text} onDelete = {deleteAnime} onLike = {onLike} ></AnimeList>
              </div>
            </>
          }/>
        <Route path = '/posts/:id' element = {<Edit onEdit = {editAnime}/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
