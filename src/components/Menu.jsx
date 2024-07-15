import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiPieChart, FiMonitor, FiSearch } from "react-icons/fi";
import { GrUserPolice } from "react-icons/gr"
import SubMenu from "./SubMenu";
import { MenuContext } from "../context/MenuContext";
import { IoIosMenu } from "react-icons/io";

const Menu = () => {

    const { showMenu, showSubMenu, loginOK, handleShowMenu, handleShowOffSubMenu, handleClickSubmenu } = useContext(MenuContext);

    return (
        <>
            {
                showMenu ?
                    <div className={`bg-[#D9D9D9] fixed left-0 top-20 w-52 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}>
                        <ul className="pl-3 mt-4">
                            <li className={`flex flex-row justify-between items-center pb-3 pl-2`}>
                                <p className="text-lg font-bold">MENU</p>
                                <IoIosMenu className="text-3xl mx-2 text-[#1474E4] cursor-pointer" onClick={handleShowMenu} />
                            </li>
                            <li className={'py-2 pl-2'} >
                                {loginOK ?
                                    (<NavLink to={"/vigicontrol/dashboard"} className={({ isActive }) =>
                                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2 hover:bg-white group transition ease-in-out duration-200 ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
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
                                    <NavLink to="/vigicontrol/seguimiento" className={({ isActive }) =>
                                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2  hover:bg-white group transition ease-in-out duration-200 ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
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
                                    <NavLink to="/vigicontrol/personal" className={({ isActive }) =>
                                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2  hover:bg-white group transition ease-in-out duration-200 ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleClickSubmenu}>
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
                            {showSubMenu && <SubMenu/>}
                        </ul>
                        <Outlet />
                    </div >
                    :
                    <div className={`bg-[#D9D9D9] fixed left-0 top-20 w-24 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ease-in-out duration-200`}>
                        <ul className="pl-3 mt-4">
                            <li className={`flex flex-row justify-between items-center pb-3 pl-2`}>
                                <IoIosMenu className="text-3xl mx-2 text-[#1474E4] cursor-pointer" onClick={handleShowMenu} />
                            </li>
                            <li className={'py-2 pl-2'} >
                                {loginOK ?
                                    (<NavLink to={"/vigicontrol/dashboard"} className={({ isActive }) =>
                                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2 hover:bg-white group transition ease-in-out duration-200 ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
                                        <FiPieChart className="group-hover:text-[#1474E4] text-3xl" />
                                    </NavLink>)
                                    :
                                    (<NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                                        <FiPieChart className="text-3xl" />
                                    </NavLink>)
                                }
                            </li>
                            <li className={`py-2 pl-2`}>
                                {loginOK ?
                                    <NavLink to="/vigicontrol/seguimiento" className={({ isActive }) =>
                                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2  hover:bg-white group transition ease-in-out duration-200 ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleShowOffSubMenu}>
                                        <FiMonitor className="group-hover:text-[#1474E4] text-3xl" />
                                    </NavLink>
                                    :
                                    <NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                                        <FiMonitor className="text-3xl" />
                                    </NavLink>
                                }
                            </li>
                            <li className={`pt-2 pl-2`}>
                                {loginOK ?
                                    <NavLink to="/vigicontrol/personal" className={({ isActive }) =>
                                        `flex flex-row justify-between items-center rounded-l-lg px-2 py-2  hover:bg-white group transition ease-in-out duration-200 ${isActive ? 'bg-white text-[#1474E4]' : ''}`} onClick={handleClickSubmenu}>
                                        <GrUserPolice className="group-hover:text-[#1474E4] text-3xl" />
                                    </NavLink>
                                    :
                                    <NavLink className={`flex flex-row justify-between items-center rounded-l-lg px-2 py-2 group opacity-50 pointer-events-none`}>
                                        <GrUserPolice className="text-3xl" />
                                    </NavLink>
                                }
                            </li>
                            {showSubMenu && <SubMenu className="transition-all" />}
                        </ul>
                        <Outlet />
                    </div >
        }
        </>
    );
};

export default Menu;