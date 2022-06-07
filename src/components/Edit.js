
import { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import MyInput from './MyInput'

const Edit = ({onEdit}) => {

    /* states used */
    const [loading, setLoading] = useState(true)
    const [anime, setAnime] = useState('')
    const [name, setName] = useState('')
    const [score, setScore] = useState('')
    const [comment, setComment] = useState('')
    const [favorite, setFavorite] = useState('')
    const [image, setImage] = useState('')
    const [showEdit, setShowEdit] = useState(false)

    /*shows the current values*/
    const params = useParams()
    const navigate = useNavigate()

    /* initialize fields to previously saved values */ 
    useEffect(()=> {
        const fetchTask = async () => {
            const res = await fetch (`http://localhost:5000/posts/${params.id}`)
            const data = await res.json()
            if (res.status === 404){
                navigate('/')   // brings you to home page
            }
            setAnime(data)
            setName(data.name)
            setScore(data.score)
            setComment(data.comment)
            setFavorite(data.favorite)
            setImage(data.image)
            setLoading(false)
        }
        fetchTask()
    }, [])

    /* setters */
    const onImage = (base64Code)=>{setImage(base64Code)}
    const onName = (newName)=>{setName(newName)}
    const onScore = (newScore)=>{setScore(newScore)}
    const onComment = (newComment)=>{setComment(newComment)}
    const onFavorite = (liked)=>{setFavorite(liked)}

    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div className="containerEdit">
            <h3>{anime.name}</h3>
            <p>{anime.score}/10</p>
            <p>{anime.comment}</p>
            <p>Favorite: {anime.favorite ? 'True': 'False'}</p>
            <button onClick = {()=> setShowEdit(!showEdit)}>{showEdit ? 'Stop Edit': 'Edit' }</button>
            <button onClick = {()=> navigate(-1)}> Go Back</button> {/* -1 for go back 1 page*/}
            <MyInput 
                onDo = {onEdit} 
                name = {name}
                score = {score}
                comment = {comment}
                favorite = {favorite}
                image = {image}
                anime = {anime} 
                entryType = {true} 
                onName = {onName} 
                onScore = {onScore} 
                onComment={onComment} 
                onFavorite = {onFavorite} 
                onImage = {onImage} 
                showEdit = {showEdit} // set to toggle to button click
                >
            </MyInput>
        </div>
    )
}

export default Edit