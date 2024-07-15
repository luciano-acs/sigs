import React, {useEffect, useState, useContext} from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { MenuContext } from '../context/MenuContext';

const SubMenu = () => {

    const { handlePerfilSeleccionado } = useContext(MenuContext);

    return (
        <ul className="bg-[#1474E4]/50 py-2 pl-2 rounded-bl-lg ml-2">
            <li className="flex flex-row items-center mb-1">
                <NavLink to="/vigicontrol/personal" className={`flex flex-row items-center mb-1 group`} onClick={() => handlePerfilSeleccionado(null)}>
                    <IoIosArrowForward className="group-hover:text-lg" />
                    <span className={`group-hover:font-semibold transition-all text-sm`}>Listado</span>
                </NavLink>
            </li>
            <li className="flex flex-row items-center mb-1">
                <NavLink to="/vigicontrol/personal/altas" className={`flex flex-row items-center mb-1 group`}>
                    <IoIosArrowForward className="group-hover:text-lg" />
                    <span className={`group-hover:font-semibold transition-all text-sm`}>Altas</span>
                </NavLink>
            </li>
            <Outlet />
        </ul>
    )
}

export default SubMenu