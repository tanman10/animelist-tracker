import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AnimeList from './components/AnimeList';
import Hub from './components/Hub';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './components/Edit';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() { 
  /*
    objects should contain the following attributes
    .id 
    .name
    .score
    .comment
    .favorite
    .image
  */

  const[objList, setObjList] = useState([]) // objList holds all objects from database

  /* 
    useEffect, occurs when the page loads
    set obj to objects from the database
  */ 
  useEffect(()=> { 
    const getAnime = async() => {
      const animeFromDatabase = await myFetchAnime('http://localhost:5000/posts')
      setObjList(animeFromDatabase) 
    }
    getAnime()
  }, []) // dependency arry added here so useEffect is only called ONCE


  /*
    helper function
    get the objects (animes) from the database
  */
  const myFetchAnime = async (link) => {
    const res = await fetch(link) 
    const data = await res.json()
    return data
  }

  /* 
    add anime to list
  */
  const addAnime = async (newObject) => {
    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newObject)
    })
    const data = await res.json()
    setObjList([...objList,data])
  }

  /*
    delete anime from list
  */
  const deleteAnime = async (id) => {
    console.log(id)
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'Delete'
    })
    setObjList(objList.filter((anime)=> anime.id !== id))
  }

  /* 
    change the interface to list the anime 
    sorted anime by name then id.
    database order doesn't change
    uses ASCII so A < ... < Z < a < ... < z
  */
  const sortAnime = async () => {
    const animeFromDatabase = await myFetchAnime('http://localhost:5000/posts?_sort=name,id') 
    setObjList(animeFromDatabase)
  }



  /* 
    change the interface to list the anime 
    with 'word' in there name.
    database order doesn't change
  */
  const searchAnime = async (word) => {
    const animeFromDatabase = await myFetchAnime(`http://localhost:5000/posts?name_like=${word}`) 
    setObjList(animeFromDatabase)
  }


  /* 
    toggle the favorite attribute for anime with id (like button)
  */
  const toggleLike = async (id) => {
    const animeToToggle = await myFetchAnime(`http://localhost:5000/posts/${id}`)
    const updAnime = {...animeToToggle, favorite: !animeToToggle.favorite}
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updAnime)
    })
    const data = await res.json()
  
    setObjList(objList.map((anime)=>
      anime.id === id ? {...anime,favorite : data.favorite} : anime))
  }
  

  /* 
    update anime list
  */
  const editAnime = async (newObject) => {
    const id = newObject.num
    //update backend
    const animeToUpdate = await myFetchAnime(`http://localhost:5000/posts/${id}`)
    const upatedAnime = {...animeToUpdate, name: newObject.name, score: newObject.score, 
      comment: newObject.comment, favorite: newObject.favorite, image: newObject.image}
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(upatedAnime)
    })
    const data = await res.json()
    /* update front end */
    setObjList(objList.map((anime)=>
      anime.id === id ? {...anime, name: data.name, rate: data.rate, 
        comment: data.comment, favorite : data.favorite, image: data.image} : anime))

    /* to update the interface */
    const getAnime = async() => {
      const tasksFromServer = await myFetchAnime('http://localhost:5000/posts') 
      setObjList(tasksFromServer) 
    }
    getAnime()
  }
  

  /*
    notifications
  */
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };



  return (
    <BrowserRouter>
      <div className='container'> 
        <Header title = "Anime"></Header>
        <Routes>
          <Route path = '/' element = {
            <>
              <SearchBar onSearch = {searchAnime}></SearchBar>
              <div className='containerHubAndAnimeList'>
                <Hub objList = {objList} onAdd = {addAnime} onSort = {sortAnime}></Hub>
                <AnimeList objList = {objList} onDelete = {deleteAnime} onLike = {toggleLike} ></AnimeList>
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
