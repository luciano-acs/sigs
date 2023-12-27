import React, { useState } from "react";
import Nav from "./Nav";
import { Link, Outlet } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { FiPieChart, FiMonitor, FiSearch } from "react-icons/fi";
import { GrUserPolice } from "react-icons/gr"
import { IoIosArrowForward } from "react-icons/io";

const Menu = () => {

    const [subMenuPersonal, setSubMenuPersonal] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link) => {   
        link === 'personal' ? setSubMenuPersonal(!subMenuPersonal) : setSubMenuPersonal(false);
        setActiveLink(link === activeLink ? '' : link); 
    }

    return (
        <div className="bg-[#D9D9D9] fixed left-0 top-20 w-52 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <ul className="pl-3 mt-4">
                <li className={`flex flex-row justify-between items-center pb-3`}>
                    <input className={`bg-white w-full rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4]`}></input>
                    <button>
                        <FiSearch className="text-3xl mx-2 text-[#1474E4]" />
                    </button>
                </li>
                <li className={`${activeLink === 'dashboard' ? 'bg-white my-2 py-2 pl-2' : ''} hover:bg-white my-2 py-2 pl-2 rounded-tl-lg rounded-bl-lg group transition-colors`}>
                    <Link to="/dashboard" >
                        <a onClick={() => handleClick('dashboard')} className={` ${activeLink === 'dashboard' ? 'bg-white text-[#1474E4]' : ''} flex flex-row justify-between items-center rounded-lg py-2 px-2`}>
                            <FiPieChart className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={`${activeLink === 'dashboard' ? 'font-bold' : ''}group-hover:text-[#1474E4]`}>Dashboard</span>
                        </a>
                    </Link>
                </li>
                <li className={`${activeLink === 'seguimiento' ? 'bg-white my-2 py-2 pl-2' : ''} hover:bg-white my-2 py-2 pl-2 rounded-tl-lg rounded-bl-lg group transition-colors`}>
                    <Link to="/seguimiento">
                        <a onClick={() => handleClick('seguimiento')} className={` ${activeLink === 'seguimiento' ? 'bg-white text-[#1474E4]' : ''} flex flex-row justify-between items-center rounded-lg py-2 px-2`}>
                            <FiMonitor className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={`${activeLink === 'seguimiento' ? 'font-bold' : ''}group-hover:text-[#1474E4]`}>Seguimiento</span>
                        </a>
                    </Link>
                </li>
                <li className={`${activeLink === 'personal' ? 'bg-white mt-2 py-2 pl-2' : 'rounded-bl-lg'} hover:bg-white mt-2 py-2 pl-2 rounded-tl-lg group transition-colors`}>
                    <Link to="/personal" >
                        <a onClick={() => handleClick('personal')} className={`${activeLink === 'personal' ? 'bg-white text-[#1474E4]' : ''} flex flex-row justify-between items-center rounded-lg py-2 px-2`}>
                            <GrUserPolice className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={`${activeLink === 'personal' ? 'font-bold' : ''}group-hover:text-[#1474E4]`}>Personal</span>
                        </a>
                    </Link>
                </li>
                {subMenuPersonal && (
                    <li className="bg-[#1474E4]/50 mb-2 py-2 pl-2 rounded-bl-lg transition-all">
                        <ul className="transition-all">
                            <li>
                                <a href="#" className="group flex flex-row items-center mb-1">
                                    <IoIosArrowForward className="group-hover:text-2xl transition-all" />
                                    <span className="group-hover:font-bold transition-all">Listado</span>
                                </a>
                            </li>
                            <li className="flex flex-row items-center mb-1">
                                <a href="#" className="flex flex-row items-center mb-1 group">
                                    <IoIosArrowForward className="group-hover:text-2xl transition-all" />
                                    <span className="group-hover:font-bold transition-all">Altas</span>
                                </a>
                            </li>
                            <li className="flex flex-row items-center mb-1">
                                <a href="#" className="flex flex-row items-center mb-1 group">
                                    <IoIosArrowForward className="group-hover:text-2xl transition-all" />
                                    <span className="group-hover:font-bold transition-all">Modificaciones y Bajas</span>
                                </a>
                            </li>
                        </ul>
                    </li>)}
                <li className={`${activeLink === 'informes' ? 'bg-white my-2 py-2 pl-2' : ''} hover:bg-white my-2 py-2 pl-2 rounded-tl-lg rounded-bl-lg group transition-colors`}>
                    <Link to="/informe" >
                        <a onClick={() => handleClick('informes')} className={` ${activeLink === 'informes' ? 'bg-white text-[#1474E4]' : ''} flex flex-row justify-between items-center rounded-lg py-2 px-2`}>
                            <RiBillLine className="group-hover:text-[#1474E4] text-3xl" />
                            <span className={`${activeLink === 'informes' ? 'font-bold' : ''}group-hover:text-[#1474E4]`}>Informes</span>
                        </a>
                    </Link>
                </li>
            </ul>
            <Outlet />
            {<Nav setActiveLink={handleClick}/>}
        </div>
    );
};

export default Menu;