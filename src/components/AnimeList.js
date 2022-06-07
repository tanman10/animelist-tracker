import Anime from "./Anime"

const AnimeList = ({objList, onDelete, onLike}) => {

  /*decomposes list of objects into individual objects */
  return (
    <div className= "containerAnimeListAndTitle">
      <h1>Your Anime List</h1>
      <div className= "containerAnimeList">  
        {objList.map((obj)=> (
          <Anime 
            key = {obj.id} 
            anime = {obj} 
            onDelete = {onDelete} 
            onLike = {onLike}>
          </Anime>
        ))}
      </div>
    </div>
  )
}

export default AnimeList