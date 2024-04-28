import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            {auth ?
                <ul className='nav-ul nav-right'>
                    <li>< Link onClick={logout} to="/login" >Logout</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login" >Log In </Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;
