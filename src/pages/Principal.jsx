import { useEffect, useContext } from "react";
import { MenuContext } from "../context/MenuContext";
const Principal = () => {

    const { showMenu, changeUser } = useContext(MenuContext);

    useEffect(() => {
        fetch('http://localhost:8080/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok || localStorage.getItem('token') === null) {
                    changeUser();
                    throw new Error("Servidor no disponible, intente más tarde");
                }
                return response.json();
            })
            .catch(error => {
                console.log(error);
                changeUser();
            }, []);
    });

    return (
        <div className={`${showMenu ? 'w-calc left-52' : 'w-calc100 left-24'} fixed top-20 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col items-center transition-all`}>
            <img src="../../public/casa.jpg" className="object-cover object-center w-full h-full absolute z-10" />
            <div className="w-full h-full bg-black/60 absolute z-20"></div>
            <h1 className="py-12 text-white text-6xl z-40 font-semibold">
                SGMP
            </h1>
            <h2 className="py-8 text-center text-3xl text-white uppercase z-40">
                Sistema Integral de gestión y monitoreo de personal policial
            </h2>
            <p className="px-32 py-12 text-2xl text-white text-center z-40">
                Nuestra aplicación web está diseñada para fortalecer la eficiencia operativa y el control administrativo dentro de las fuerzas policiales. Con un enfoque en la gestión de eventos y el personal, ofrecemos herramientas intuitivas para la carga, almacenamiento y análisis de datos críticos. Desde la supervisión de eventos hasta la gestión del personal, nuestra plataforma proporciona una solución integral para mejorar la eficacia y la toma de decisiones dentro de su institución policial
            </p>
        </div>
    );
}

export default Principal;