
import { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";


const Edit = ({onEdit}) => {

    const [loading, setLoading] = useState(true)
    const [task, setTasks] = useState('')
    const [name, setName] = useState('')
    const [score, setScore] = useState('')
    const [comment, setComment] = useState('')
    const [favorite, setFavorite] = useState('')
    const [image, setImage] = useState('')
    const [showEdit, setShowEdit] = useState(false)

    //shows the current values
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchTask = async () => {
            const res = await fetch (`http://localhost:5000/posts/${params.id}`)
            const data = await res.json()

            if (res.status === 404){
                navigate('/')   // brings you to home page
            }
            
            setTasks(data)
            setLoading(false)
        }
        fetchTask()
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name){
            alert('please add a name')
            return
        }
        const num = params.id
        onEdit({num, name, score, comment, favorite})

        // setName('')
        // setScore('')
        // setComment('')
        // setFavorite(false)
    }


    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            <h3>{task.name}</h3>
            <p>{task.score}/10</p>
            <p>{task.comment}</p>
            <p>favorite: {task.favorite ? 'true': 'false'}</p>
            <button onClick = {()=> setShowEdit(!showEdit)}>{showEdit ? 'Stop Edit': 'Edit' }</button>
            <button onClick = {()=> navigate(-1)}> Go back</button> {/* -1 for go back 1 page*/}
        

            {showEdit && <form onSubmit={onSubmit} >
                <div>
                    
                    <h3>Change Name</h3>
                    <input type ='text' 
                        value = {name}
                        ref = {()=>setName(task.name)}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Change Score</h3>
                    <input type ='text' 
                    value={score}
                    ref = {()=>setScore(task.score)}
                    onChange={(e)=>setScore(e.target.value)}
                />
                </div>
                    <h3>Change Comment</h3>
                    <textarea 
                        cols="21" 
                        rows="10" 
                        type ='text' 
                        value={comment}
                        ref = {()=>setComment(task.comment)}
                        onChange={(e)=>setComment(e.target.value)}>
                    </textarea>
                <div>
                    <label> Favorite </label>
                    <input type = 'checkbox' 
                        value = {favorite} checked = {task.favorite}
                        onChange={(e)=> setFavorite(e.currentTarget.checked)}
                    />
                </div>
                <input type = 'submit' value = 'Update Anime'/>
            </form>}
        </div>
    )
}

export default Edit