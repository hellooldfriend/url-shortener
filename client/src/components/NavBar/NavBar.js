import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const NavBar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth.logout();
        history.push('/');
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="/create">Create</a>
                </li>
                <li>
                    <a href="/links">Links</a>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                    >Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;