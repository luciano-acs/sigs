import React, { useState, useContext } from 'react'
import FormUsuario from '../components/FormUsuario'
import Swal from 'sweetalert2'
import { MenuContext } from '../context/MenuContext'

const AltaPersonal = () => {

  const [formKey, setFormKey] = useState(0)
  const [formData, setFormData] = useState({
    "personalID": "",
    "apeYnom": "",
    "cargo": null,
    "visible": 1,
    "gradoID": {
      "gradoID": "",
      "grado": ""
    },
    "comisariaID": null,
    "domicilioID": null,
    "distritoID": {
      "distritoID": "",
      "nombre": "",
      "domicilioID": null
    },
    "rolUsuarioID": {
      "rolUsuarioID": 2,
      "descripcion": "USER"
    },
    "username": "",
    "password": ""
  })

  const { showMenu } = useContext(MenuContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevoPersonal = {
      ...formData,
      cargo: parseInt(formData.cargo),
      gradoID: {
        gradoID: formData.gradoID,
        grado: null
      },
      distritoID: {
        distritoID: parseInt(formData.distritoID),
        nombre: null,
        domicilio: null
      }
    }

    console.log(nuevoPersonal)

    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoPersonal)
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire("PERSONAL REGISTRADO", "", "success");
          setFormKey(formKey + 1)
          return response.json()
        }
        throw new Error('Error al cargar nuevo personal')
      })
      .catch((error) => console.log(error))
  }

  const handleFormChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <div className={`${showMenu ? 'left-52 w-calc' : 'left-24 w-calc100'} fixed top-20 h-full ease-in-out duration-150`}>
        <h1 className='font-bold text-4xl pl-12 py-6 text-left text-black uppercase'>Alta de Personal</h1>
        <div className='flex items-start justify-center flex-col mt-6 ml-12 w-3/5'>
          <FormUsuario key={formKey} handleFormChange={handleFormChange} />
          <button className="w-52 mt-8 text-white bg-black rounded-xl px-4 font-semibold text-lg ml-auto" type='submit' onClick={handleSubmit}>Registrar</button>
        </div>
      </div>
    </>
  )
}

export default AltaPersonal