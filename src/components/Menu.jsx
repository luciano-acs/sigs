import React, { useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { FiPieChart, FiMonitor, FiSearch } from "react-icons/fi";
import { GrUserPolice } from "react-icons/gr"
import SubMenu from "./SubMenu";
import { MenuContext } from "../context/MenuContext";
import Swal from 'sweetalert2';

const Menu = () => {

    const { showSubMenu, loginOK, handleShowOffSubMenu, handleClickSubmenu } = useContext(MenuContext);

    return (
        <div className="bg-[#D9D9D9] fixed left-0 top-20 w-52 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <ul className="pl-3 mt-4">
                <li className={`flex flex-row justify-between items-center pb-3`}>
                    <input className={`bg-white w-full rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4]`}></input>
                    <button>
                        <FiSearch className="text-3xl mx-2 text-[#1474E4]" />
                    </button>
                </li>
                <li className={'py-2 pl-2'} >
                    {loginOK ?
                        (<NavLink to={"/dashboard"} className={({ isActive }) =>
                            `flex flex-row justify-between items-center rounded-l-lg px-2 py-2 hover:bg-white group ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
                            <FiPieChart className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={'group-hover:text-[#1474E4]'}>Dashboard</span>
                        </NavLink>)
                        :
                        (<NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                            <FiPieChart className="text-3xl" />
                            <span>Dashboard</span>
                        </NavLink>)
                    }
                </li>
                <li className={`py-2 pl-2`}>
                    {loginOK ?
                        <NavLink to="/seguimiento" className={({ isActive }) =>
                            `flex flex-row justify-between items-center rounded-l-lg px-2 py-2  hover:bg-white group ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
                            <FiMonitor className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={`group-hover:text-[#1474E4]`}>Seguimiento</span>
                        </NavLink>
                        :
                        <NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                            <FiMonitor className="text-3xl" />
                            <span>Seguimiento</span>
                        </NavLink>
                    }
                </li>
                <li className={`pt-2 pl-2`}>
                    {loginOK ?
                        <NavLink to="/personal" className={({ isActive }) =>
                            `flex flex-row justify-between items-center rounded-l-lg px-2 py-2  hover:bg-white group ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleClickSubmenu}>
                            <GrUserPolice className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={`group-hover:text-[#1474E4]`}>Personal</span>
                        </NavLink>
                        :
                        <NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                            <GrUserPolice className="text-3xl" />
                            <span>Personal</span>
                        </NavLink>
                    }
                </li>
                {showSubMenu && <SubMenu className="transition-all" />}
                <li className={`pt-4 pl-2`}>
                    {loginOK ?
                        <NavLink to="/informe" className={({ isActive }) =>
                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2 hover:bg-white group ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
                        <RiBillLine className="group-hover:text-[#1474E4] text-3xl" />
                        <span className={`group-hover:text-[#1474E4]`}>Informes</span>
                    </NavLink>
                    :
                    <NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                        <RiBillLine className="text-3xl" />
                        <span>Informes</span>
                    </NavLink>
                    }
                </li>
            </ul>
            <Outlet />
        </div >
    );
};

export default Menu;