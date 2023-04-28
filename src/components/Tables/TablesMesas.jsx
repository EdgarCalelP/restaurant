import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://reservasrestfullapp.onrender.com/api/mesa/listar/"
const getMesas = async (funcion)=>{
  try{
    const response = await axios({
      url,
      method: 'GET'
    })
    return funcion(response.data)
  }catch (e){console.log(e)}
}

const TableMesas = () => {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    getMesas(setMesas)
  }, []);

  const headerTable = [
    { name: "Mesa" },
    { name: "Capacidad" },
    { name: "Ubicacion" },
    { name: "Comentario" },
    { name: "Acciones" },
  ];

  return (
    <div className="px-8 flex-col justify-center md:w-full reservationBody">
      <div className="flex  w-[80%] md:w-[75%] ">
        <h2 className="mx-auto my-9">LISTA DE MESAS</h2>
        <button className=" flex-shrink-0 h-full my-auto bg-[#10b981] hover:bg-gray-700 rounded-lg font-bold px-3 py-2  text-slate-300 text-xs md:text-sm">
          Crear
        </button>
      </div>
      <div className=" mx-auto table-responsive block drop-shadow-md  ">
        <table className="w-full md:w-auto sm:w-auto lg:w-2/5 leading-normal mx-auto ">
          <thead>
            <tr>
              {headerTable.map((item, index) => (
                <th key= {index} className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa, index) => (
              <tr key={index} className=" border-gray-200 bg-gray-100 mx-auto">
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.nombre_completo}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.capacidad}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.ubicacion}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.comentario}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center">
                  <button
                    type="button"
                    className=" text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      class="inline-block h-6 w-6 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMesas;
