import AddAnime from "./AddAnime"

const Hub = ({text, onAdd, onDelete, onReset, onSort}) => {
  return (
    <div className="hub">
      <h3>Add Anime Here</h3>
      <AddAnime onAdd={onAdd}></AddAnime>
      <button onClick = {()=>onDelete(text)}> Delete All</button>
      <button onClick = {()=>onReset(text)}> Reset </button>
      <button onClick = {()=>onSort()}>Sort</button>
    </div>
  )
}

export default Hub