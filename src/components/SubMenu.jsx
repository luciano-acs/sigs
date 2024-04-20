import React, {useState} from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link, NavLink, Outlet } from 'react-router-dom'


const SubMenu = () => {

    return (
        <ul className="bg-[#1474E4]/50 py-2 pl-2 rounded-bl-lg ml-2">
            <li className="flex flex-row items-center mb-1">
                <NavLink to="/personal" className={`flex flex-row items-center mb-1 group`}>
                    <IoIosArrowForward className="group-hover:text-xl transition-all" />
                    <span className={`group-hover:font-bold transition-all text-sm`}>Listado</span>
                </NavLink>
            </li>
            <li className="flex flex-row items-center mb-1">
                <NavLink to="/personal/altas" className={`flex flex-row items-center mb-1 group`}>
                    <IoIosArrowForward className="group-hover:text-xl transition-all" />
                    <span className={`group-hover:font-bold transition-all text-sm`}>Altas</span>
                </NavLink>
            </li>
            <Outlet />
        </ul>
    )
}

export default SubMenu