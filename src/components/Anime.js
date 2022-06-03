import { Link } from 'react-router-dom'

const Anime = ({text, onDelete, onLike}) => {
  
  return (
    <div 
      style = {{width: '300px', backgroundSize: 'cover', backgroundImage: `url(${text.image})`}}
    >
      <h3 style = {{display:'flex', alignItems: 'center', justifyContent: 'space-between'}}> {/*this uses .anime h3 style */}
        {/* https://dreamyguy.github.io/react-emojis/ */}
        <button onClick={()=>onLike(text.id)}> {text.favorite ? "👍" : "👎" }</button>
        {text.name}
        <button onClick={()=>onDelete(text.id)}> Delete </button> {/* putting the delete here puts it in a different place on interface*/}
      </h3>
      <p>{text.score} / 10</p>
      <p>{text.comment ? text.comment : "no comment"}</p>
      <p> <Link to ={`/posts/${text.id}`}> Edit Details</Link> </p>
      {/* <img style ={{height:'200px'}} src= {text.image}/>  */}
    </div>
  )
}

export default Anime