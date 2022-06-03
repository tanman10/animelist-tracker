import Anime from "./Anime"

const AnimeList = ({text, onDelete, onLike}) => {
  return (
    <div>
      <h1>Your Anime List</h1>
      {text.map((ani)=> (
        <Anime key = {ani.id} text = {ani} onDelete = {onDelete} onLike = {onLike}></Anime>
      ))}
    </div>
  )
}

export default AnimeList