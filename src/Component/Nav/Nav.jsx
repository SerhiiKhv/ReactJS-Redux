import React from 'react';
import s from './Nav.module.css';
import {NavLink} from "react-router-dom";

const Nav = (props) => {

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.activeLink} >Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/masseg' activeClassName={s.activeLink} >Message</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/setting' activeClassName={s.activeLink} >Setting</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' activeClassName={s.activeLink} >Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.activeLink} >Users</NavLink>
            </div>

            <div className={s.frends}>

            </div>
        </nav>
    );
}

export default Nav;