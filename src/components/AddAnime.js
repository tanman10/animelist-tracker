import { useState } from "react"
import MyInput from './MyInput'

const AddAnime = ({onAdd}) => {

    /* states used */
    const [name, setName] = useState('')
    const [score, setScore] = useState('')
    const [comment, setComment] = useState('')
    const [favorite, setFavorite] = useState(false)
    const [image, setImage] = useState('')

    /*setters */
    const onName = (newName)=>{setName(newName)}
    const onScore = (newScore)=>{setScore(newScore)}
    const onComment = (newComment)=>{setComment(newComment)}
    const onFavorite = (liked)=>{setFavorite(liked)}
    const onImage = (base64Code)=>{setImage(base64Code)}

  return (
    <MyInput 
      onDo = {onAdd} 
      name = {name}
      score = {score}
      comment = {comment}
      favorite = {favorite}
      image = {image}
      anime = {{id:0}} // need to pass an object with attribute id so line:38 in MyInput works
      entryType = {false} // this code only has 2 possibilities add or edit, 
                          // if there were more would have to use a switch/case
      onName = {onName} 
      onScore = {onScore} 
      onComment={onComment} 
      onFavorite = {onFavorite} 
      onImage = {onImage}
      showEdit = {true} // want to be visible so set to true
      > 
    </MyInput>
  )
}

export default AddAnime