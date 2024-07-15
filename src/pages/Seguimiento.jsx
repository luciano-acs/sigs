import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const Seguimiento = () => {

    const [formExcelDataMemo, setFormExcelDataMemo] = useState([]);
    const [formExcelDataEventos, setFormExcelDataEventos] = useState([]);
    const [optionSelected, setOptionSelected] = useState('memo');
    const [cantOK, setCantOK] = useState(0);

    const [fechaBusqueda, setFechaBusqueda] = useState('');

    const headersMemo = ['SERVICIO', 'PERSONAL', 'FECHA', 'HORARIO']
    const headersEventos = ['EVENTO', 'PERSONAL', 'FECHA', 'HORA']

    const { showMenu } = useContext(MenuContext);

    const handleFileEventosUpload = (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];

                const hasAllHeaders = headersEventos.every(header => headers.includes(header));

                if (hasAllHeaders) {
                    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

                    excelData.forEach(row => {
                        const fecha = new Date((row.FECHA - (25567 + 1)) * 86400 * 1000);
                        const formattedDate = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

                        const horario = row.HORA;
                        let hora = Math.floor(horario * 24);
                        let minutos = Math.floor((horario * 24 - hora) * 60);
                        let segundos = Math.round((((horario * 24 - hora) * 60) - minutos) * 60);

                        if (segundos === 60) {
                            segundos = 0;
                            minutos++;
                        }

                        if (minutos === 60) {
                            minutos = 0;
                            hora++;
                        }

                        if (hora === 24) {
                            hora = 0;
                        }

                        hora = hora < 10 ? `0${hora}` : hora;
                        minutos = minutos < 10 ? `0${minutos}` : minutos;
                        segundos = segundos < 10 ? `0${segundos}` : segundos;

                        const formattedHour = `${hora}:${minutos}:${segundos}`;

                        row.FECHA = formattedDate;
                        row.HORA = formattedHour;
                    });

                    setFormExcelDataEventos(excelData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en la carga',
                        text: 'No es un archivo compatible con el formato de eventos'
                    });
                }

                fileInput.value = null;
            };

            reader.readAsBinaryString(file);
        }
    }

    const handleFileMemoUpload = (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];

                const hasAllHeaders = headersMemo.every(header => headers.includes(header));

                if (hasAllHeaders) {
                    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { dateNF: 'dd/mm/yyyy' });

                    excelData.forEach(row => {
                        const fecha = new Date((row.FECHA - (25567 + 1)) * 86400 * 1000);
                        const formattedDate = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

                        row.FECHA = formattedDate;
                    });

                    setFormExcelDataMemo(excelData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en la carga',
                        text: 'No es un archivo compatible con el formato de memo'
                    });
                }

                fileInput.value = null;
            };

            reader.readAsBinaryString(file);
        }
    }

    const handleSelect = (e) => {
        setOptionSelected(e.target.value);
    }

    const handlecarga = () => {
        if (optionSelected === 'memo') {
            var cantOkMemo = 0;
            setCantOK(0);
            const fetchPromises = formExcelDataMemo.map(fila => {
                return Promise.all([
                    fetch(`https://srv555183.hstgr.cloud:3002/personal/listar/${fila.PERSONAL}`, {
                        method: 'GET',
                        headers: {
                            'authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            return data;
                        }),
                    fetch(`https://srv555183.hstgr.cloud:3002/horarios/horario/${fila.HORARIO}`, {
                        method: 'GET',
                        headers: {
                            'authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            return data;
                        })
                ])
                    .then(([personal, horario]) => {
                        delete personal.enabled;
                        delete personal.authorities;
                        delete personal.accountNonExpired;
                        delete personal.credentialsNonExpired;
                        delete personal.accountNonLocked;

                        const fecha = fila.FECHA.split('/');
                        const year = fecha[2];
                        const month = fecha[1] < 10 ? `0${fecha[1]}` : fecha[1];
                        const day = fecha[0];
                        const fechaFormateada = `${year}-${month}-${day}`;

                        const nuevoServicio = {
                            "servicioID": null,
                            "nombre": fila.SERVICIO,
                            "fecha": fechaFormateada,
                            "personalID": personal,
                            "horarioID": horario
                        };

                        return fetch('https://srv555183.hstgr.cloud:3002/servicio/serv', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify(nuevoServicio)
                        });
                    })
                    .then(response => {
                        if (response.status === 200) {
                            cantOkMemo++;
                        }
                    })
                    .catch(error => console.log(error));
            });

            Promise.all(fetchPromises)
                .then(() => {
                    if (cantOkMemo === formExcelDataMemo.length) {
                        Swal.fire('Carga exitosa');
                    } else {
                        Swal.fire('Error en la carga');
                    }
                    setCantOK(cantOkMemo);
                });
        } else {
            var cantOkEventos = 0;
            setCantOK(0);
            const fetchPromises = formExcelDataEventos.map(fila => {
                let partes_fecha = fechaBusqueda.split('-');
                let year = partes_fecha[0];
                let month = partes_fecha[1];
                let day = partes_fecha[2];

                const servicioBusqueda = {
                    "nombre": fila.PERSONAL,
                    "fecha": `${year}-${month}-${day}`
                };

                return Promise.all([
                    fetch(`https://srv555183.hstgr.cloud:3002/tareas/listar/${fila.EVENTO}`, {
                        method: 'GET',
                        headers: {
                            'authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            return data;
                        }),
                    fetch(`https://srv555183.hstgr.cloud:3002/servicio/buscar`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify(servicioBusqueda)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.personalID.authorities) delete data.personalID.authorities;
                            if (data.personalID.enabled) delete data.personalID.enabled;
                            if (data.personalID.accountNonExpired) delete data.personalID.accountNonExpired;
                            if (data.personalID.credentialsNonExpired) delete data.personalID.credentialsNonExpired;
                            if (data.personalID.accountNonLocked) delete data.personalID.accountNonLocked;
                            return data;
                        })
                ]).then(([tarea, servicio]) => {

                    let partes_fecha = fila.FECHA.split('/');
                    let year = partes_fecha[2];
                    let month = partes_fecha[1];
                    let day = partes_fecha[0];

                    if (month.length === 1) {
                        month = `0${month}`;
                    }

                    const nuevoServicioTarea = {
                        "servicioTareaID": 0,
                        "fecha": `${year}-${month}-${day}`,
                        "hora": fila.HORA,
                        "servicioID": servicio,
                        "tareaID": tarea
                    };

                    return fetch('https://srv555183.hstgr.cloud:3002/ata/ingresar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify(nuevoServicioTarea)
                    })
                        .then(response => {
                            cantOkEventos++;
                            return response;
                        })
                        .catch(error => console.log(error));
                })
                    .then(response => {
                        if (response.status === 200) {
                            cantOkEventos++;
                        }
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => console.log(error));
            });

            Promise.all(fetchPromises)
                .then(() => {
                    if (cantOkEventos === (formExcelDataMemo.length)*2) {
                        Swal.fire('Carga exitosa');
                    } else {
                        Swal.fire('Error en la carga');
                    }
                    setCantOK(cantOkEventos);
                })
                .catch(error => console.log(error));
        }
    };

    return (
        <div className={`${showMenu ? 'left-52 w-calc' : 'left-24 w-calc100'} fixed top-20 h-calc overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ease-in-out duration-150`}>
            <h1 className='font-bold text-4xl pl-12 py-6 text-left text-black uppercase'>Seguimiento</h1>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col justify-between items-start'>
                    <select name="" id="" onChange={handleSelect} className='ml-12 bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8' defaultValue="memo">
                        <option value="eventos">Eventos</option>
                        <option value="memo">Memo</option>
                    </select>
                    {
                        optionSelected === 'eventos' ? (
                            <input className='ml-12 mt-4 bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 transition-all' type="date" name="" id="fechaevento" onChange={(e) => setFechaBusqueda(e.target.value)} />
                        ) :
                            (
                                <input className='ml-12 mt-4 bg-white w-96 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 transition-all' type="date" name="" id="fechaevento" disabled />
                            )
                    }

                    <form className='pl-12 my-4 flex'>
                        {
                            optionSelected === 'eventos' ?
                                <>
                                    <label htmlFor="" className='px-4 bg-[#1474E4]/50 text-black rounded-l-md py-4 font-semibold w-48'>Subir eventos del día</label>
                                    <input type="file" className='pl-8 px-4 bg-black/25 rounded-r-md py-3' accept='.xlsx, .xls' onChange={handleFileEventosUpload} /> </>
                                :
                                <>
                                    <label htmlFor="" className='px-4 bg-[#1474E4]/50 text-black rounded-l-md py-4 font-semibold w-48'>Subir memo del día</label>
                                    <input type="file" className='pl-8 px-4 bg-black/25 rounded-r-md py-3' accept='.xlsx, .xls' onChange={handleFileMemoUpload} />
                                </>
                        }
                    </form>
                </div>
                <div className='pr-12'>
                    <button className='w-52 text-white bg-black rounded-xl px-4 font-semibold text-lg' onClick={handlecarga}>CARGAR</button>
                </div>
            </div>
            {
                optionSelected === 'eventos' ?
                    (
                        <div className='w-calc m-auto mt-8 pb-8'>
                            <table className='table-auto w-full'>
                                <thead className='bg-[#1474E4]/30 h-10'>
                                    <tr>
                                        <th className='border border-collapse'>Evento</th>
                                        <th className='border border-collapse'>Personal</th>
                                        <th className='border border-collapse'>Fecha</th>
                                        <th className='border border-collapse'>Hora</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        formExcelDataEventos.length > 0 ? (
                                            formExcelDataEventos.map(fila =>
                                            (
                                                <tr key={fila.cuenta} className='h-12'>
                                                    <td className='border border-collapse'>{fila.EVENTO}</td>
                                                    <td className='border border-collapse'>{fila.PERSONAL}</td>
                                                    <td className='border border-collapse'>{fila.FECHA}</td>
                                                    <td className='border border-collapse'>{fila.HORA}</td>
                                                </tr>
                                            )
                                            )
                                        )
                                            :
                                            (
                                                <tr>
                                                    <td colSpan='6' className='h-12 font-bold'>No hay datos</td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                    :
                    (
                        <div className='w-calc m-auto mt-8 pb-8'>
                            <table className='table-auto w-full'>
                                <thead className='bg-[#1474E4]/30 h-10'>
                                    <tr>
                                        <th className='border border-collapse'>Servicio</th>
                                        <th className='border border-collapse'>Personal</th>
                                        <th className='border border-collapse'>Fecha</th>
                                        <th className='border border-collapse'>Horario</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        formExcelDataMemo.length > 0 ? (
                                            formExcelDataMemo.map(fila =>
                                            (
                                                <tr key={fila.cuenta} className='h-12'>
                                                    <td className='border border-collapse'>{fila.SERVICIO}</td>
                                                    <td className='border border-collapse'>{fila.PERSONAL}</td>
                                                    <td className='border border-collapse'>{fila.FECHA}</td>
                                                    <td className='border border-collapse'>{fila.HORARIO}</td>
                                                </tr>
                                            )
                                            )
                                        )
                                            :
                                            (
                                                <tr>
                                                    <td colSpan='6' className='h-12 font-bold'>No hay datos</td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }

        </div>
    );
};
export default Seguimiento;