import AddAnime from "./AddAnime"

const Hub = ({objList, onAdd, onSort}) => {
  return (
    <div className="containerHub">
      <h3>Add Anime Here</h3>
      <AddAnime onAdd={onAdd}></AddAnime>
      <br></br>
      <button className = "test" onClick = {()=>onSort()}>Sort</button>      
      <h6> Anime will be sorted such that {'A < Z < a < z'} </h6>
    </div>
  )
}

export default Hub