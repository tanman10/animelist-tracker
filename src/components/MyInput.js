
/* 
    onDo is either Add function or Edit function
    name is the name attribute
    score is the score attribute
    comment is the comment attribute
    favorite is the favorite attribute
    image is the image attribute
    anime is the id of the anime for the edit function, id = 0 for add function
    entryType is the identifier for onDo
    onName is setName
    onComment is setComment
    onFavorite is setFavorite
    onImage is setImage
    showEdit is a bool to hide or show the form
*/
const MyInput = ({onDo, name, score, comment, favorite, image, 
    anime, entryType, onName, onScore, onComment, onFavorite, onImage, showEdit}) => {
        
    /* set base64 to image display*/
    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64image = await convertBase64(file)
        return onImage(base64image)
    }
    /* convert image to base64 code */
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

    /* 
        remove image from preview 
        idky but it triggers the alert below
    */
    const clear = () => {
        onImage('')
    }

    /* make the handle request */
    const onSubmit = (e) => {
        e.preventDefault()
        if(!name){
            alert('please add a name')
            return
        }
        const num = anime.id
        { entryType 
            ? 
                onDo({num, name, score, comment, favorite, image}) //update
            : 
                add() // add
        }
    }

    /*adder function*/
    const add = () => {
        onDo({name, score, comment, favorite, image})
        // to empty the form
        onName('')
        onScore('')
        onComment('')
        onFavorite(false)
        onImage('') 
    }
    

    /* Dynamic Form Template */
    return (
        <div className={entryType ? "containerEdit" : "containerAdd"}>
            {showEdit && <form onSubmit={onSubmit}>
                {entryType && <h3>Change Name</h3>} {/* dynamic component */}
                <input type ='text' 
                    value = {name}
                    placeholder = {!entryType && 'Add Name'} // dynamic component
                    onChange={(e)=>onName(e.target.value)}
                />
                {entryType && <h3>Change Score</h3>} {/* dynamic component */}
                <input type = 'text'
                    min ='0'
                    max ='10'
                    value={score}
                    placeholder = {!entryType && 'Add Score'} // dynamic component
                    onChange={(e)=>onScore(e.target.value)}
                />
                {entryType && <h3>Change Comment</h3>} {/* dynamic component */}
                <textarea 
                    cols="21" //only 100 zoom this looks fine, on 90 zoom it looks to big
                    rows="10" 
                    type ='text' 
                    placeholder = {!entryType && 'Add Comment'} // dynamic component
                    value={comment}
                    onChange={(e)=>onComment(e.target.value)}>
                </textarea>
                <div>
                    <label> Favorite </label>
                    <input type = 'checkbox' 
                        value = {favorite} 
                        onChange={(e)=> onFavorite(e.currentTarget.checked)}
                    />
                </div>
                {entryType && <h3>'Change Image'</h3>} {/* dynamic component */}
                <input type = 'file' onChange = {(e)=> uploadImage(e)} />
                <img src={image} height='100px'></img>
                <button type = "button" onClick={clear}> Clear Image</button> 
                {/* type = "button is necessary else form thinks you are trying to 
                submit when clicking this button" */}
                <br></br>
                <input type = 'submit' value = {entryType ? 'Update Anime' : 'Add Anime'}/>
            </form>}
        </div>
  )
}

export default MyInput