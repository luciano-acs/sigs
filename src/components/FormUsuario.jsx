import React, { useState, useEffect } from 'react'

const FormUsuario = ({ personalId, handleFormChange }) => {

    const [personal, setPersonal] = useState({});
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedDistrito, setSelectedDistrito] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (personalId) {
            fetch(`http://localhost:8080/personal/listar/${personalId}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                },
                'cors': 'no-cors'
            })
                .then((response) => response.json())
                .then((data) => {
                    setPersonal(data)
                    setSelectedGrado(data?.gradoID?.gradoID || '')
                    setSelectedDistrito(data?.distritoID?.distritoID || '')
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [personalId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonal((prevPersonal) => ({
            ...prevPersonal,
            [name]: value,
        }));
        handleFormChange(name, value)
    };

    const handleSelectGradoChange = (e) => {
        const { name, value } = e.target;
        setSelectedGrado(e.target.value)
        handleFormChange(name, value)
    };

    const handleSelectDistritoChange = (e) => {
        const { name, value } = e.target;
        setSelectedDistrito(e.target.value)
        handleFormChange(name, value)
    };

    return (
        <form className="flex flex-row justify-between w-full" action="">
            <div className='flex items-start flex-col mr-4'>
                <label className='py-2'>ID</label>
                <input className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="text" name="personalID" id="personalID" value={personal.personalID} onChange={handleInputChange} />
                <label className='py-2'>Apellido y nombre</label>
                <input className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="text" name="apeYnom" id="apeYnom" value={personal.apeYnom} onChange={handleInputChange} />
                <label className='py-2'>Domicilio</label>
                <input className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="text" name="nombre" id="domicilio" value={personal?.domicilioID?.direccion} onChange={handleInputChange} />
                <label className='py-2'>Cargo</label>
                <input className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="number" name="cargo" id="cargo" value={personal.cargo} onChange={handleInputChange} />
            </div>
            <div className='flex items-start flex-col'>
                <label className='py-2'>Usuario</label>
                <input className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="text" name="username" id="usuario" value={personal.username} onChange={handleInputChange} />
                <label className='py-2'>Contraseña</label>
                <input className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="password" name="password" id="contrasena" value={personal.password} onChange={handleInputChange} />                
                <label className='py-2'>Grado</label>
                <select className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="text" name="gradoID" id="grado" value={selectedGrado} onChange={handleSelectGradoChange}>
                    <option hidden selected>Seleccione un grado</option>
                    <option value="1">AGENTE</option>
                    <option value="2">PTP</option>
                    <option value="3">CABO</option>
                    <option value="4">SARGENTO</option>
                </select>
                <label className='py-2'>Distrito</label>
                <select className="bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mb-4" type="number" name="distritoID" id="distrito" value={selectedDistrito} onChange={handleSelectDistritoChange}>
                    <option hidden value="">Seleccione un distrito</option>
                    <option value="1">DISTRITO I</option>
                    <option value="2">DISTRITO II</option>
                    <option value="3">DISTRITO III</option>
                    <option value="4">DISTRITO IV</option>
                    <option value="5">DISTRITO V</option>
                    <option value="6">DISTRITO VI</option>
                    <option value="7">DISTRITO VII</option>
                    <option value="8">DISTRITO VIII</option>
                    <option value="9">DISTRITO IX</option>
                    <option value="10">DISTRITO X</option>
                </select>
            </div>
        </form>
    )
}

export default FormUsuario