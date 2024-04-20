import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom'

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [loginOK, setLoginOK] = useState(localStorage.getItem('loginOK') ? true : false);
    const [user, setUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user') : '');
    const navigate = useNavigate();

    const handleShowOffSubMenu = () => {
        setShowSubMenu(false);
    }

    const handleClickSubmenu = (link) => {
        setShowSubMenu(!showSubMenu)
    }

    const handleLoginOK = () => {
        localStorage.setItem('loginOK', loginOK);
        setLoginOK(!loginOK);
    }

    const changeUser = () => {
        if (loginOK) {
            setUser('')
            handleShowOffSubMenu()
            handleLoginOK()
            navigate('/')
            localStorage.clear();
        }
    }

    return (
        <MenuContext.Provider value={{ showSubMenu, loginOK, user, setUser, handleLoginOK, handleShowOffSubMenu, handleClickSubmenu, changeUser }}>
            {children}
        </MenuContext.Provider>
    )
}