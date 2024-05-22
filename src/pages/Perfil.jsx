import React, { useContext, useEffect, useState } from 'react'
import { MenuContext } from '../context/MenuContext'
import { LuUserCircle2 } from "react-icons/lu";

const Perfil = () => {

    const { showMenu, perfilSeleccionado } = useContext(MenuContext)
    const [personal, setPersonal] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/personal/listar/${perfilSeleccionado}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            'cors': 'no-cors'
        })
            .then((response) => response.json())
            .then(data => {
                const nuevoPersonal = {
                    id: data.id,
                    apeYnom: data.apeYnom,
                    grado: data.gradoID.grado,
                    cargo: data.cargo,
                    distrito: data.distritoID.nombre
                }
                setPersonal(nuevoPersonal)
            })
    }, [perfilSeleccionado])

    return (
        <div className={`${showMenu ? 'left-52 w-calc' : 'left-24 w-calc100'} fixed top-20 h-calc ease-in-out duration-150`}>
            <div className='grid grid-cols-5 grid-rows-2 gap-4 h-full w-full p-3'>
                <div className='row-span-2 bg-[#0A3E79] shadow-md shadow-black rounded-md flex justify-around items-center flex-col'>
                    <LuUserCircle2 className='text-white text-9xl'/>
                    <p className='text-white font-bold text-semibold text-center text-xl'>{personal.apeYnom}</p>
                    <p className='text-white font-bold text-semibold text-center text-xl'>{personal.grado}</p>
                    <p className='text-white font-bold text-semibold text-center text-xl'>{personal.cargo}</p>
                    <p className='text-white font-bold text-semibold text-center text-xl'>{personal.distrito}</p>
                </div>
                <div className='col-span-2 bg-[#D9D9D9] shadow-md shadow-black rounded-md'></div>
                <div className='col-span-2 bg-[#D9D9D9] shadow-md shadow-black rounded-md'></div>
                <div className='col-span-2 bg-[#D9D9D9] shadow-md shadow-black rounded-md'></div>
                <div className='col-span-2 bg-[#D9D9D9] shadow-md shadow-black rounded-md'></div>
            </div>
        </div>
    )
}

export default Perfil