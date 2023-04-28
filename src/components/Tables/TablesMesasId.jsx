import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import imagen from ".././../img/mesaInt.jpg";
import { useParams } from "react-router-dom";

const TablesMesasID = () => {
  const [mesaDesc, setMesaDesc] = useState({});
  const params = useParams()
  useEffect(() => {
    const getTableInfo = async () => {
      if (params.id) {
        const selectedTable = await axios.get(`https://reservasrestfullapp.onrender.com/api/mesa/mostrar/${params.id}`);
        if (selectedTable.data) {
          setMesaDesc(selectedTable.data);
          console.log(selectedTable.data);
          console.log(mesaDesc)

          //setLoader(true)
        }
      }
    };
    getTableInfo();
  }, [params.id]);
  return (
    <section className="container mx-auto bg-green-100 text-gray-800">
      <div className="container flex flex-col mx-auto lg:flex-row">
        <div className="ml-9 w-full lg:w-1/3 m-auto">
          <img src={imagen} alt="imagen-mesa" />
        </div>
        <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8 mb-8 text-green-600"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>

          <h2 className="text-3xl font-bold leading-none">{mesaDesc.nombre_completo}</h2>

          <p className="font-bold mt-2 mb-2 text-xl">
            Capacidad:    <span className="text-zinc-600">{mesaDesc.capacidad} personas</span>
          </p>
          <p className="font-bold mt-1 mb-2 text-xl">Ubicacion:  <span className="text-zinc-600">{mesaDesc.ubicacion}</span></p>
          <p className="font-bold mt-1 mb-2 text-xl">Apta para:  <span className="text-zinc-600">{mesaDesc.comentario}</span></p>
          <button className="mt-4  self-start px-10 py-3 text-lg font-medium rounded-3xl bg-green-600 text-gray-50">
            Reservar
          </button>
        </div>
      </div>
    </section>
  );
};

export default TablesMesasID