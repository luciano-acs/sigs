import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { MenuContext } from '../context/MenuContext';
import { CgSpinner } from "react-icons/cg";


const ModalLogin = (props) => {

    const { showOffModalLogin } = props;
    const { handleLoginOK, setUser } = useContext(MenuContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loadingUser, setLoadingUser] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingUser(true);
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    if (response.status === 200) {
                        showOffModalLogin();
                        return response.json();
                    }
                }else{
                    throw new Error("Usuario o contraseñas incorrectos")
                }
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                fetch(`http://localhost:8080/personal/user/${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                        'Content-Type': 'application/json'
                    },
                    'mode': 'cors'
                })
                    .then(response => response.json())
                    .catch(error => console.log(error))
                    .then(data => {
                        localStorage.setItem('user', data.apeYnom);
                        setUser(data.apeYnom);
                        handleLoginOK();
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.log(error)
                setLoadingUser(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message !== ('Usuario o contraseñas incorrectos') ? 'Servidor no disponible, intente nuevamente' : error.message
                })            
            })
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-[#D9D9D9] flex justify-center items-center rounded-xl p-8'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <h1 className='text-center text-xl font-bold uppercase'>Iniciar Sesión</h1>
                    <div className='flex flex-col mt-8 my-2'>
                        <label htmlFor="">Ingrese su usuario:</label>
                        <input className='bg-white w-64 rounded-lg py-1 px-3 border-[#1474E4] border-2 focus:outline-[#1474E4] mb-4' type="text" id='inputUsuario' onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="">Ingrese su contraseña:</label>
                        <input className='bg-white w-64 rounded-lg py-1 px-3 border-[#1474E4] border-2 focus:outline-[#1474E4]' type="password" id='inputPassword' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <a href='' className='text-xs text-center font-bold uppercase'>¿Olvidaste tu contraseña?</a>
                    <div className='flex flex-col items-center mt-8'>
                        <button type='submit' className='bg-[#0A3E79] text-white rounded-md text-xl px-2 my-4 w-32 h-8 flex justify-center items-center gap-2'>
                            <CgSpinner className={loadingUser ? 'animate-spin' : 'hidden'}></CgSpinner>
                            <p className='text-white text-xl'>Ingresar</p>
                        </button>
                        <button className='bg-red-500 text-white text-xl rounded-md px-2 w-32 h-8' onClick={showOffModalLogin}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;