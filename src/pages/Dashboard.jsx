import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const Dashboard = () => {

    const [distritos, setDistritos] = useState([])
    const [dataEventos, setDataEventos] = useState([])
    const [dataTarea, setDataTarea] = useState([])
    const [listadoEventos, setListadoEventos] = useState([])
    const [evento, setEvento] = useState('V10')
    const [listadoDistritos, setListadoDistritos] = useState([])

    const [distritosSeleccionados, setDistritosSeleccionados] = useState(new Set());
    const [eventosSeleccionados, setEventosSeleccionados] = useState(new Set());
    const [loading, setLoading] = useState(false);

    const { showMenu } = useContext(MenuContext);

    const handleExportPDF = () => {
        setLoading(true);

        const input = document.getElementById('componente-a-exportar');

        html2canvas(input, {
            scale: 4
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'l',
                    unit: 'mm',
                    format: [420, 200]
                });

                pdf.addImage(imgData, 'PNG', 10, 10, 400, 190);
                const date = new Date();
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                const second = date.getSeconds().toString().padStart(2, '0');
                const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

                pdf.text(`REPORTE DE EVENTOS - ${formattedDate}`, 140, 10, { align: 'right' });
                pdf.save('componente.pdf');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al exportar a PDF:', error);
            });
    };

    const handleGraficas = (eventos) => {
        const newDataEventos = []

        eventos.map((evento) => {
            const distrito = evento.nombreDistrito
            const index = newDataEventos.findIndex((item) => item.distrito === distrito)

            if (index !== -1) {
                if (evento.nombreTarea === 'ARRIBO') {
                    newDataEventos[index].arribo = evento.cantidadTarea
                } else if (evento.nombreTarea === 'LOGIN') {
                    newDataEventos[index].login = evento.cantidadTarea
                } else if (evento.nombreTarea === 'NOVEDAD') {
                    newDataEventos[index].novedad = evento.cantidadTarea
                } else if (evento.nombreTarea === 'ARRIBO INVALIDO') {
                    newDataEventos[index].arriboInvalido = evento.cantidadTarea
                }
            } else {
                const nuevoEvento = {
                    "distrito": evento.nombreDistrito,
                    "arribo": evento.nombreTarea === 'ARRIBO' ? evento.cantidadTarea : 0,
                    "login": evento.nombreTarea === 'LOGIN' ? evento.cantidadTarea : 0,
                    "novedad": evento.nombreTarea === 'NOVEDAD' ? evento.cantidadTarea : 0,
                    "arriboInvalido": evento.nombreTarea === 'ARRIBO INVALIDO' ? evento.cantidadTarea : 0
                }

                newDataEventos.push(nuevoEvento)
            }
        })

        setDataEventos(newDataEventos)
    }

    const handleTareas = (tareas, personalTotal) => {
        const newDataTarea = []
        tareas.map((tarea) => {
            const nuevaTarea = {
                "id": tarea.nombreDistrito,
                "label": tarea.nombreDistrito,
                "value": (tarea.cantidadTarea * 100 / personalTotal).toFixed(2)
            }
            newDataTarea.push(nuevaTarea)
        })

        setDataTarea(newDataTarea)
    }

    const handleClickDistrito = (index) => {

        const nuevosDistritosSeleccionados = new Set(distritosSeleccionados);

        if (nuevosDistritosSeleccionados.has(index)) {
            nuevosDistritosSeleccionados.delete(index);
        } else {
            nuevosDistritosSeleccionados.add(index);
        }

        setDistritosSeleccionados(nuevosDistritosSeleccionados);
    }

    const handleClickEvento = (index) => {

        const nuevosEventoSeleccionados = new Set(eventosSeleccionados);

        if (nuevosEventoSeleccionados.has(index)) {
            nuevosEventoSeleccionados.delete(index);
        } else {
            nuevosEventoSeleccionados.add(index);
        }

        setEventosSeleccionados(nuevosEventoSeleccionados);
    }

    useEffect(() => {
        distritosSeleccionados.size === 0 ? setListadoDistritos([]) : setListadoDistritos([...distritosSeleccionados])
    }, [distritosSeleccionados])

    useEffect(() => {
        eventosSeleccionados.size === 0 ? setListadoEventos([]) : setListadoEventos([...eventosSeleccionados])
    }, [eventosSeleccionados])

    useEffect(() => {
        const fetchData = () => {
            Promise.all([
                fetch(`https://srv555183.hstgr.cloud:3002/personal/distritos?nombreDistritos=`, {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        return data;
                    }),
                fetch(`https://srv555183.hstgr.cloud:3002/personal/eventos?nombreDistritos=${listadoDistritos}&nombreEventos=${listadoEventos}`, {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        return data;
                    }),
                fetch(`https://srv555183.hstgr.cloud:3002/personal/eventos?nombreEventos=${evento}&nombreDistritos=${listadoDistritos}`, {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        return data;
                    }),

            ]).then(([distritos, eventos, tareas]) => {

                setDistritos(distritos)

                let personalTotal = 0
                distritos.map((distrito) => {
                    personalTotal += distrito.cantidadPersonal;
                })

                handleGraficas(eventos)
                handleTareas(tareas, personalTotal)

            })
                .catch(error => {
                    console.log(error)
                })
        }

        fetchData();

        const interval = setInterval(() => {
            fetchData()
        }, 300000)

        return () => clearInterval(interval)

    }, [evento, listadoDistritos, listadoEventos])

    return (
        <div className={`${showMenu ? 'left-52 w-calc' : 'left-24 w-calc100'} fixed top-20 h-calc ease-in-out duration-150`} >
            <div className="w-full h-full flex flex-row flex-wrap justify-center items-center pt-2" id="componente-a-exportar">
                <div className="w-2/3 h-2/3 flex justify-center items-center pl-8 pr-3 py-2" >
                    <div className='w-full h-full bg-[#0A3E79] shadow-lg shadow-black rounded-md'>
                        <div className='w-full h-fit bg-[#0A3E79] rounded-md'>
                            <div className='w-full h-full bg-[#D9D9D9] p-2 rounded-md'>
                                <form className='flex justify-start items-center flex-row pl-4'>
                                    <div className='pl-4 flex justify-start items-center gap-4 pr-4'>
                                        <input type='checkbox' className='bg-white w-8 h-6' onClick={() => handleClickEvento("V04")}></input>
                                        <label htmlFor="" className='text-sm text-center'>ARRIBO</label>
                                        <input type='checkbox' className='bg-white w-8 h-6' onClick={() => handleClickEvento("_PI")}></input>
                                        <label htmlFor="" className='text-sm text-center'>ARRIBO INVALIDO</label>
                                        <input type='checkbox' className='bg-white w-8 h-6' onClick={() => handleClickEvento("V10")}></input>
                                        <label htmlFor="" className='text-sm text-center'>LOGIN</label>
                                        <input type='checkbox' className='bg-white w-8 h-6' onClick={() => handleClickEvento("V03")}></input>
                                        <label htmlFor="" className='text-sm text-center'>NOVEDAD</label>
                                    </div>
                                    <div className='flex items-center justify-center ml-auto pr-4'>
                                        <button
                                            className='bg-[#1474EA] text-white rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 w-44 uppercase font-semibold flex items-center justify-center'
                                            onClick={handleExportPDF}
                                            disabled={loading}
                                        >
                                            {loading ? 'Generando PDF...' : 'EXPORTAR A PDF'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {
                            dataEventos.length === 0 ? <motion.h1
                                className={`text-2xl text-white uppercase flex justify-center items-center font-semibold h-90%`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                No hay eventos para los distritos seleccionados
                            </motion.h1>
                                :
                                <ResponsiveBar
                                    data={dataEventos}
                                    keys={[
                                        'login',
                                        'arribo',
                                        'arriboInvalido',
                                        'novedad'
                                    ]}
                                    indexBy="distrito"
                                    margin={{ top: 20, right: 150, bottom: 100, left: 90 }}
                                    padding={0.3}
                                    valueScale={{ type: 'linear' }}
                                    indexScale={{ type: 'band', round: true }}
                                    colors={{ scheme: 'blues' }}
                                    defs={[
                                        {
                                            id: 'dots',
                                            type: 'patternDots',
                                            background: 'inherit',
                                            color: '#38bcb2',
                                            size: 4,
                                            padding: 1,
                                            stagger: true
                                        },
                                        {
                                            id: 'lines',
                                            type: 'patternLines',
                                            background: 'inherit',
                                            color: '#eed312',
                                            rotation: -45,
                                            lineWidth: 6,
                                            spacing: 10
                                        }
                                    ]}
                                    borderColor={{
                                        from: 'color',
                                        modifiers: [
                                            [
                                                'darker',
                                                1.6
                                            ]
                                        ]
                                    }}
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Uso de la aplicación por distrito',
                                        legendPosition: 'middle',
                                        legendOffset: 32,
                                        truncateTickAt: 0
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Cantidad de eventos',
                                        legendPosition: 'middle',
                                        legendOffset: -40,
                                        truncateTickAt: 0,
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    labelTextColor="black"
                                    animate={true}
                                    legends={[
                                        {
                                            dataFrom: 'keys',
                                            anchor: 'bottom-right',
                                            direction: 'column',
                                            justify: false,
                                            translateX: 120,
                                            translateY: 0,
                                            itemsSpacing: 2,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemDirection: 'left-to-right',
                                            itemOpacity: 0.85,
                                            symbolSize: 20,
                                            itemTextColor: '#ffffff',
                                        }
                                    ]}
                                    theme={{
                                        axis: {
                                            ticks: {
                                                text: {
                                                    fill: '#ffffff'
                                                }
                                            },
                                            legend: {
                                                text: {
                                                    fill: '#ffffff'
                                                }
                                            }
                                        },
                                        grid: {
                                            line: {
                                                stroke: '#ffffff',
                                                strokeWidth: 1
                                            }
                                        }
                                    }}
                                    role="application"
                                    ariaLabel="Nivo bar chart demo"
                                    barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
                                />
                        }

                    </div>
                </div>
                <div className="w-1/3 h-2/3 flex justify-center items-center pr-8 pl-3 py-2">
                    <div className='w-full h-full bg-[#0A3E79] shadow-lg shadow-black rounded-md'>
                        <select className="bg-white w-72 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 mt-2 ml-4" type="number" name="distritoID" id="distrito" onChange={(e) => setEvento(e.target.value)}>
                            <option hidden value="" className='p-0'>Seleccione un evento</option>
                            <option value="V10">LOGIN</option>
                            <option value="V04">ARRIBO</option>
                            <option value="_PI">ARRIBO INVALIDO</option>
                            <option value="V03">NOVEDAD</option>
                        </select>
                        {
                            dataTarea.length === 0 ? <motion.h1
                                className={`text-2xl text-white text-center uppercase flex justify-center items-center font-semibold h-90%`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}>
                                No hay tareas para los distritos seleccionados
                            </motion.h1>
                                :
                                <ResponsivePie
                                    data={dataTarea}
                                    margin={{ top: 30, right: 95, bottom: 100, left: 80 }}
                                    sortByValue={true}
                                    innerRadius={0.6}
                                    colors={{ scheme: 'purple_blue' }}
                                    borderWidth={1}
                                    borderColor={{
                                        from: 'color',
                                        modifiers: [
                                            [
                                                'darker',
                                                '0.3'
                                            ]
                                        ]
                                    }}
                                    arcLinkLabelsSkipAngle={10}
                                    arcLinkLabelsTextOffset={4}
                                    arcLinkLabelsTextColor="#ffffff"
                                    arcLinkLabelsOffset={3}
                                    arcLinkLabelsDiagonalLength={10}
                                    arcLinkLabelsStraightLength={15}
                                    arcLinkLabelsThickness={2}
                                    arcLinkLabelsColor="white"
                                    arcLabelsSkipAngle={10}
                                    arcLabelsTextColor={{
                                        from: 'color',
                                        modifiers: [
                                            [
                                                'darker',
                                                '2'
                                            ]
                                        ]
                                    }}
                                    motionConfig="slow"
                                    transitionMode="centerRadius"
                                    legends={[
                                        {
                                            anchor: 'bottom-right',
                                            direction: 'column',
                                            justify: false,
                                            translateX: 100,
                                            translateY: 40,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemsSpacing: 0,
                                            symbolSize: 15,
                                            itemDirection: 'left-to-right',
                                            itemTextColor: '#ffffff',
                                            symbolSpacing: 10,
                                        }
                                    ]}
                                />
                        }

                    </div>
                </div>
                <div className='w-full h-1/3 flex justify-center items-center px-8 py-4'>
                    <div className='w-full min-h-full bg-[#0A3E79] shadow-lg shadow-black rounded-md px-4 py-4 grid grid-rows-2 grid-cols-5 gap-x-16 gap-y-4'>
                        {distritos.map((distrito, index) => {
                            const estaSeleccionado = distritosSeleccionados.has(distrito.distrito);
                            return (
                                <div
                                    key={index}
                                    className={`hover:bg-[#1474EA] hover:text-white transition-all min-w-150px h-full rounded-md flex justify-center items-center flex-col shadow-md shadow-black ${estaSeleccionado ? 'bg-[#1474EA] text-white shadow-sm shadow-gray-100' : 'bg-[#D9D9D9]'}`}
                                    onClick={() => handleClickDistrito(distrito.distrito)}
                                >
                                    <motion.h1 className='text-center text-2xl font-bold px-2 uppercase'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}>{distrito.distrito}</motion.h1>
                                    <motion.div
                                        className='flex justify-center items-center text-xl font-semibold'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}>{distrito.cantidadPersonal}</motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;