import { useLocation } from 'react-router'
import Button from './Button.jsx'

const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation()

    return (
        <header className = 'header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button 
                color={showAdd ? 'red' : 'green'} 
                text={showAdd ? 'Close' : 'Add'} 
                onClick = {onAdd}
            />}
        </header>
    )
}

export default Header
