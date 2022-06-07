import { Link } from 'react-router-dom'

const Header = ({title}) => {
  /*return to home page when clicked */
  return (
    <Link to ={`/`}>
      <div className="header">
        <h1> {title} </h1>
      </div>
    </Link>
  )
}

export default Header