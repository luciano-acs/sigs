import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuContext } from '../context/MenuContext';

const UserMenu = () => {

    const { changeUser } = useContext(MenuContext);    

    return (
        <div className='fixed top-20 right-16 bg-[#D9D9D9] h-auto rounded-md w-40 mt-2'>
            <ul className='py-2'>
                <Link className='w-full'><li className='text-black font-semibold hover:bg-black hover:text-white px-2 text-right transition-all'>Perfil</li></Link>
                <button className='w-full' onClick={changeUser}><li className='text-black text-right font-semibold hover:bg-black hover:text-white px-2 transition-all'>Cerrar Sesión</li></button>
            </ul>
        </div>
    )
}

export default UserMenu