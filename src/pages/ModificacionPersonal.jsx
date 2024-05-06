import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import FormUsuario from '../components/FormUsuario';
import Swal from 'sweetalert2';

const ModificacionPersonal = (props) => {

  const { funcionModalPersonal, personalId } = props;

  const [formData, setFormData] = useState({});

  const cambiarEstadoModal = (funcion) => {
    funcionModalPersonal(funcion);
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/personal/listar/${personalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      'cors': 'no-cors'
    })
      .then((response) => response.json())
      .then(data => {

        if(formData.grado && formData.gradoID){
          const gradoID = {
            gradoID: formData.gradoID,
            grado: formData.grado
          }
          formData.gradoID = {...gradoID}
        }

        if(formData.distrito && formData.distritoID){
          const distritoID = {
            distritoID: formData.distritoID,
            distrito: formData.distrito
          }
          formData.distritoID = {...distritoID}
        }

        const actualizacion = {
          ...data,
          ...formData
        };

        delete actualizacion.enabled;
        delete actualizacion.authorities;
        delete actualizacion.accountNonExpired;
        delete actualizacion.credentialsNonExpired;
        delete actualizacion.accountNonLocked;

        fetch(`http://localhost:8080/personal/actualizar/${personalId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(actualizacion)
        })
          .then((response) => {
            if (response.ok) {              
              Swal.fire("Personal actualizado", "", "success");
              cambiarEstadoModal('cerrar')
            }
          })
          .catch((error) => console.log(error))
      })
      .catch(err => console.log(err))
  }

  const handleFormChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  }



  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-[#D9D9D9] flex flex-col justify-center items-start rounded-xl p-4 w-2/4">
          <MdClose className='flex ml-auto text-3xl cursor-pointer' onClick={() => cambiarEstadoModal('')} />
          <div className='flex pl-4'>
            <h1 className='font-bold text-4xl py-6 text-black uppercase'>Modificaciones</h1>
          </div>
          <div className='flex p-4 w-full'>
            <FormUsuario personalId={personalId} handleFormChange={handleFormChange} esModificacion={true}/>
          </div>
          <div className='flex justify-center w-52 text-white bg-black rounded-xl font-semibold text-lg ml-auto mr-4'>
            <button className='' onClick={handleSubmit}>Actualizar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModificacionPersonal