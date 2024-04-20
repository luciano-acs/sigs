import { useEffect, useContext } from "react";
import { MenuContext } from "../context/MenuContext";
const Principal = () => {

    const { changeUser } = useContext(MenuContext);

    useEffect(() => {
        fetch('http://localhost:8080/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
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
            <div className="fixed top-20 left-52 w-calc h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col items-center">
                <img src="src/assets/casa.jpg" className="object-cover object-center w-full h-full absolute z-10" />
                <div className="w-full h-full bg-black/60 absolute z-20"></div>
                <h1 className="py-12 text-white text-6xl z-40">
                    SIGS
                </h1>
                <h2 className="py-8 text-center text-3xl text-white uppercase z-40">
                    Sistema Integral de Gestión en Seguridad
                </h2>
                <p className="p-12 text-xl text-white text-center z-40">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae soluta obcaecati laudantium quod modi quasi mollitia distinctio nulla necessitatibus. Ab sed vero consectetur? Iste, mollitia. Dicta ea neque quo rem.
                    Nostrum voluptatem veniam nam adipisci doloribus animi alias dicta delectus sit consequatur. Alias laudantium, sint aliquam animi, deleniti dolor voluptatem qui aspernatur eaque cupiditate fugiat quae. Fugit illo debitis veniam?
                </p>
            </div>
        );
    }

export default Principal;