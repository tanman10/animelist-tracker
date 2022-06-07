import { Link } from 'react-router-dom'
import { useState } from 'react'

const Anime = ({anime, onDelete, onLike}) => {
  const [show, setShow] = useState(false)
  const [color, setColor] = useState('white')
  const [size, setSize] = useState('14')
  return (
    <div 
      className='anime' 
      onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}
      style = {{ backgroundSize: 'cover', backgroundImage: `url(${anime.image})`}}
    > 
      {/* like-name-delete header bar of anime */}
      <h3> 
        <button 
          style ={{cursor : 'pointer', fontSize: `${size}px`}} 
          className = "likeButton" 
          onMouseEnter={()=>setSize('20')} onMouseLeave={()=>setSize('14')} 
          onClick={()=>onLike(anime.id)}
        > 
        {anime.favorite ? "👍" : "👎" } {/* https://dreamyguy.github.io/react-emojis/ */}
        </button>
        {anime.name}
        <button 
          style ={{cursor : 'pointer', backgroundColor: color}} 
          onMouseEnter={()=>setColor('red')} onMouseLeave={()=>setColor('white')} 
          className = "deleteButton" 
          onClick={()=>onDelete(anime.id)}
        > Delete 
        </button> 
      </h3>
      <Link to ={`/posts/${anime.id}`}> 
        {/* score/comment portion of anime */}
        {!show && <h1><br></br></h1>}
        <p>{anime.score} / 10 </p>
        {show && <h4>{anime.comment}</h4>}
      </Link> 
    </div>
  )
}

export default Anime