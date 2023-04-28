import React, { useState } from 'react'
import axiosService from '../../utils/axios.service';
import { useNavigate } from "react-router-dom";

const ClientReservation = ({setIsNewClient, getClientes}) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        nombre_completo: '',
        telefono: '',
        correo: '',
        comentario: ''
    });
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
const submit = async (e)=>{
    e.preventDefault()
    const data = await axiosService.post("api/cliente/crear", input)
    setIsNewClient(false)
    getClientes()
}

    return (
        <form class="w-full max-w-lg" >
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Nombre Completo
                    </label>
                    <input value={input.nombre_completo} onChange={(e) => handleChange(e)} name='nombre_completo'
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombre" />
                    {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Telefono
                    </label>
                    <input value={input.telefono} onChange={(e) => handleChange(e)} name='telefono'
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Telefono" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Correo
                    </label>
                    <input value={input.correo} onChange={(e) => handleChange(e)} name='correo'
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" placeholder="correo electronico" required />
                    {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Comentario
                    </label>
                    <input value={input.comentario} onChange={(e) => handleChange(e)} name='comentario'
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="comentario" required />
                </div>
            </div>
            <div className='flex  justify-center'>
                {
                    input.comentario.length && input.correo.length && input.nombre_completo && input.telefono ?
                <button onClick={(e) => submit(e)} class=" mx-3 bg-green-700 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Agregar
                </button>
                     
                    :"" 
                }
                <button onClick={()=>setIsNewClient(false)} class="bg-orange-800 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Cancelar
                </button>
            </div>
        </form>
    )
}

export default ClientReservation