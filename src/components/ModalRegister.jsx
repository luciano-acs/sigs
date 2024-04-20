import React from 'react'
import FormUsuario from './FormUsuario';

const ModalRegister = ({ showOffModalRegister }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        showOffModalLogin();
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-[#D9D9D9] flex flex-col justify-center rounded-xl p-8'>
                <h1 className='text-center text-3xl font-bold uppercase mb-8'>Registrar Usuario</h1>
                <FormUsuario/>
                <div className='flex flex-row items-center mt-8 gap-8 mx-auto'>
                        <button onSubmit={handleSubmit} className='bg-[#0A3E79] text-white rounded-md text-xl px-2 my-4 w-32 h-8'>Registrar</button>
                        <button onClick={showOffModalRegister} className='bg-red-500 text-white text-xl rounded-md px-2 w-32 h-8'>Cancelar</button>
                    </div>
            </div>
        </div>
    )
}

export default ModalRegister