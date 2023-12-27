import React from "react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0A3E79] fixed bottom-0 w-full h-14 flex justify-between items-center">
            <div className="w-1/3 flex justify-start items-center ml-16">
                <p className="text-white">© 2023 Ministerio de Seguridad</p>
            </div>
            <div className="w-2/3 flex justify-end items-center mr-16">
                <FaYoutube className="text-white text-2xl mr-3" />
                <FaFacebook className="text-white text-2xl mr-3" />
                <FaInstagram className="text-white text-2xl mr-3" />                
            </div>


        </footer>
    );
};
export default Footer;