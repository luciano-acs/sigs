import React, { useState, useEffect, useContext } from "react";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteOutline, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Tooltip } from "react-tippy";
import ModificacionPersonal from "./ModificacionPersonal";
import { MenuContext } from "../context/MenuContext";
import Swal from "sweetalert2";

const Personal = () => {

    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);
    const [actualizacion, setActualizacion] = useState(true)

    const [listaPersonal, setListaPersonal] = useState([]);
    const [hoja, setHoja] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(1);
    const [busqueda, setBusqueda] = useState('');

    const { changeUser } = useContext(MenuContext);

    const openModalPersonal = (id) => {
        setPersonalSeleccionado(id);
    }

    const closeModalPersonal = (funcion) => {
        if (funcion === 'cerrar') {
            setPersonalSeleccionado(null);
        } else {
            setPersonalSeleccionado(null);
            setActualizacion(!actualizacion);
        }
    };

    const sumarHoja = () => {
        if (hoja < pages) {
            setHoja(hoja + 1);
        }
    }

    const restarHoja = () => {
        if (hoja > 1) {
            setHoja(hoja - 1);
        }
    }

    const primeraHoja = () => {
        setHoja(1);
    }

    const ultimaHoja = () => {
        setHoja(pages);
    }

    useEffect(() => {
        setLoading(true);
        setActualizacion()
        fetch(`http://localhost:8080/personal/listar/page?page=${hoja}&size=20&sortBy=apeYnom&sortOrder=ASC&id=${busqueda}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 403) {
                        throw new Error("Sesion expirada, por favor vuelva a iniciar sesion");
                    }
                }else{
                    throw new Error("Servidor no disponible, intente mas tarde");
                }
            })
            .then((data) => {
                const personalData = data.content || [];
                setListaPersonal(personalData)
                setPages(data.totalPages)
                
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                })
                changeUser()
            })
            .finally(() => {
                setLoading(false)
            });
    }, [actualizacion, hoja, busqueda]);

    const eliminarPersonal = (id) => {

        Swal.fire({
            title: "Desea eliminar este registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/personal/listar/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then((response) => response.json())
                    .then(data => {
                        const actualizacion = {
                            ...data,
                            visible: 0
                        };

                        delete actualizacion.enabled;
                        delete actualizacion.authorities;
                        delete actualizacion.accountNonExpired;
                        delete actualizacion.credentialsNonExpired;
                        delete actualizacion.accountNonLocked;

                        fetch(`http://localhost:8080/personal/eliminar/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify(actualizacion)
                        })
                            .then((response) => {
                                if (response.ok) {
                                    return response.json()
                                }
                                throw new Error('Error al actualizar nuevo personal')
                            })
                            .catch((error) => console.log(error))
                    })
                    .then(() => { setActualizacion(!actualizacion) })
                    .catch(err => console.log(err))
                Swal.fire({
                    title: "Eliminado!",
                    text: "El personal fue eliminado.",
                    icon: "success"
                });
            }
        })
    }

    return (
        <>
            <div className="fixed top-20 left-52 pb-40 w-calc h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="flex flex-row justify-between items-center h-9 my-4 p-3 w-full">
                    <h1 className='font-bold text-4xl pl-12 py-6 text-left text-black uppercase'>Listado</h1>
                    <div className="flex flex-row justify-center items-center">
                        <p className="mx-4">Personal</p>
                        <input type="text" placeholder="Id" className="bg-white w-64 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8" value={busqueda} onChange={(e) => { setBusqueda(e.target.value); setHoja(1) }}></input>
                        <button>
                            <FiSearch className="text-3xl mx-2 text-[#1474E4]" />
                        </button>
                    </div>
                </div>
                <div className="flex justify-center flex-col h-auto p-3 w-full">
                    <table className="table-auto w-full h-60">
                        <thead className="bg-[#1474E4]/30 h-10">
                            <tr>
                                <th className="border border-collapse ">ID</th>
                                <th className="border border-collapse ">Apellido y nombre</th>
                                <th className="border border-collapse ">Grado</th>
                                <th className="border border-collapse ">Cargo</th>
                                <th className="border border-collapse ">Distrito</th>
                                <th className="border border-collapse w-1/6">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center" key={null}>
                            {
                                loading ?
                                    <tr className="h-16">
                                        <td><div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 m-auto" /></td>
                                        <td><div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 m-auto" /></td>
                                        <td><div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 m-auto" /></td>
                                        <td><div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 m-auto" /></td>
                                        <td><div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 m-auto" /></td>
                                        <td><div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 m-auto" /></td>
                                    </tr>
                                    :
                                    listaPersonal.map((personal) => (
                                        <tr key={personal.id} className="h-16" >
                                            <td className="border border-collapse">{personal.personalID}</td>
                                            <td className="border border-collapse">{personal.apeYnom}</td>
                                            <td className="border border-collapse">{personal.gradoID.grado}</td>
                                            <td className="border border-collapse">{personal.cargo}</td>
                                            <td className="border border-collapse">{personal.distritoID.nombre}</td>
                                            <td className="border border-collapse flex items-center justify-center gap-8 flex-row h-full">
                                                <Tooltip className="bg-cyan-800 rounded-md px-2" title="Modificar">
                                                    <LuPencilLine className="text-4xl bg-cyan-800 text-white rounded-md py-2 cursor-pointer" onClick={() => openModalPersonal(personal.personalID)} />
                                                    {personalSeleccionado !== null && (<ModificacionPersonal funcionModalPersonal={closeModalPersonal} personalId={personalSeleccionado} />)}
                                                </Tooltip>
                                                <Tooltip className="bg-red-800 rounded-md px-2" title="Eliminar">
                                                    <MdDeleteOutline className="text-4xl bg-red-800 text-white rounded-md py-2 cursor-pointer" onClick={() => eliminarPersonal(personal.personalID)} />
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                    <div className="flex justify-center flex-row items-center mt-4 gap-4 h-8">
                        <MdKeyboardDoubleArrowLeft className="text-xl cursor-pointer" onClick={primeraHoja} />
                        <MdOutlineKeyboardArrowLeft className="text-xl cursor-pointer" onClick={restarHoja} />
                        <p className="font-bold">{hoja}</p>
                        <MdOutlineKeyboardArrowRight className="text-xl cursor-pointer" onClick={sumarHoja} />
                        <MdKeyboardDoubleArrowRight className="text-xl cursor-pointer" onClick={ultimaHoja} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Personal;