import React from "react";
import { FiSearch } from "react-icons/fi";

const Personal = () => {
    return(
        <div className="fixed top-20 left-52 pb-40 w-calc h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1474E4]/30 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <div className="flex flex-row justify-end items-center h-9 my-4 p-3 w-full">
                <p className="mx-4">Personal</p>
                <input type="text" placeholder="Id" className="bg-white w-64 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8"></input>
                <button>
                        <FiSearch className="text-3xl mx-2 text-[#1474E4]" />
                </button>
            </div>
            <div className="flex justify-center h-auto p-3 w-full">
                <table className="table-auto w-full h-60">
                    <thead className="bg-[#1474E4]/30 h-10">
                        <tr>
                            <th className="border border-collapse ">Id</th>
                            <th className="border border-collapse ">Personal</th>
                            <th className="border border-collapse ">Grado</th>
                            <th className="border border-collapse ">Cargo</th>
                            <th className="border border-collapse ">Distrito</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr className="h-8">
                            <td className="border border-collapse">1</td>
                            <td className="border border-collapse">Alfredo</td>
                            <td className="border border-collapse">Capitan</td>
                            <td className="border border-collapse">Comandante</td>
                            <td className="border border-collapse">1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Personal;