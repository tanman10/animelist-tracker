import { useState } from "react"

const SearchBar = ({onSearch}) => {
    const [text, setText] = useState('')

    const onSubmit= (e) => {
        e.preventDefault()
        onSearch(text)
    }

    return (
        <form className ='containerSearch' onSubmit={onSubmit}>
            <div className = "searchBar">
                <input type = 'text' placeholder="search anime name"
                value = {text}
                onChange={(e)=> setText(e.target.value)}
                />
            </div>
            <input style={{border: 'none'}} type = 'submit' value = 'Enter'/>
        </form>
    )
}

export default SearchBar