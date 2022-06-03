import { useState } from "react"

const AddAnime = ({onAdd}) => {

    const [name, setName] = useState('')
    const [score, setScore] = useState('')
    const [comment, setComment] = useState('')
    const [favorite, setFavorite] = useState(false)
    const [image, setImage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name){
            alert('please add a name')
            return
        }
        onAdd({name, score, comment, favorite, image})

        setName('')
        setScore('')
        setComment('')
        setFavorite(false)
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64image = await convertBase64(file)
        console.log(base64image)
        setImage(base64image)
      }
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
    
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
    
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }


  return (
    <form onSubmit={onSubmit}>
        <div>
            <input type ='text' placeholder = 'Add Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div>
            <input type ='text' placeholder = 'Add Score'
            value={score}
            onChange={(e)=>setScore(e.target.value)}
            />
        </div>
        <textarea 
            cols="21" 
            rows="10" 
            type ='text' 
            placeholder = 'Add Comment'
            value={comment}
            onChange={(e)=>setComment(e.target.value)}>
        </textarea>
        <div>
            <label> Favorite </label>
                <input type = 'checkbox' checked ={favorite}
                value = {favorite}
                onChange={(e)=> setFavorite(e.currentTarget.checked)}
            />
        </div>
        <div>
            <p>Add Image Background</p>
            <input type = 'file' onChange = {(e)=> uploadImage(e)}/>
            <br></br>
            <img src={image} height='100px'></img>
        </div>
        <input type = 'submit' value = 'Add Anime'/>
    </form>
  )
}

export default AddAnime