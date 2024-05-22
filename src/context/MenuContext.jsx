import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom'

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
    const [loginOK, setLoginOK] = useState(localStorage.getItem('loginOK') ? true : false);
    const [user, setUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user') : '');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const handlePerfilSeleccionado = (tipo) => {
        setPerfilSeleccionado(tipo)
    }

    const handleShowOffSubMenu = () => {
        setShowSubMenu(false);
    }

    const handleClickSubmenu = (link) => {
        setShowSubMenu(!showSubMenu)
        setPerfilSeleccionado(null)
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
        <MenuContext.Provider value={{ showMenu, showSubMenu, loginOK, user, setUser, handleShowMenu,handleLoginOK, handleShowOffSubMenu, handleClickSubmenu, changeUser, perfilSeleccionado, handlePerfilSeleccionado }}>
            {children}
        </MenuContext.Provider>
    )
}