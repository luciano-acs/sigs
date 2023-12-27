import React from 'react';

const ModalLogin = (props) => {

    const { showOffModalLogin, setUser } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(e.target[0].value);
        showOffModalLogin();
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-[#D9D9D9] flex justify-center items-center rounded-xl p-8'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <h1 className='text-center text-xl font-bold uppercase'>Iniciar Sesión</h1>
                    <div className='flex flex-col mt-8 my-2'>
                        <label htmlFor="">Ingrese su email:</label>
                        <input className='bg-white w-64 rounded-lg py-1 px-3 border-[#1474E4] border-2 focus:outline-[#1474E4] mb-4' type="email" id='inputUsuario' required/>
                        <label htmlFor="">Ingrese su contraseña:</label>
                        <input className='bg-white w-64 rounded-lg py-1 px-3 border-[#1474E4] border-2 focus:outline-[#1474E4]' type="password" id='inputPassword' required/>
                    </div>
                    <a href='' className='text-xs text-center font-bold uppercase'>¿Olvidaste tu contraseña?</a>
                    <div className='flex flex-col items-center mt-8'>
                        <button type='submit' className='bg-[#0A3E79] text-white rounded-md text-xl px-2 my-4 w-32 h-8'>Ingresar</button>
                        <button onClick={showOffModalLogin} className='bg-red-500 text-white text-xl rounded-md px-2 w-32 h-8'>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;