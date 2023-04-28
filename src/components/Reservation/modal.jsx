import React, { useState, useEffect } from "react"
import Pagination from "../../utils/pagination"

import ClienteNew from "./clientReservation"

const Modal = ({ visible, onClose, cliente, setSelectCliente, getClientes }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState(cliente);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientPerPage] = useState(5);
    const indexOfLastDog = currentPage * clientPerPage;
    const indexOfFirstDog = indexOfLastDog - clientPerPage;
    const currentCliente = cliente?.slice(indexOfFirstDog, indexOfLastDog);
    const pagination = (pageNumber) => { setCurrentPage(pageNumber) };
    const [isNewClient, setIsNewClient] = useState(false)

    //filter (search)
    useEffect(() => {
        setSelectCliente(
            cliente.filter((item) =>
            item.nombre_completo.toLowerCase().includes(query.toLowerCase())
          )
        );
      }, [ query]);
    const handleOnClose = () => {
        onClose()
    }
    if (!visible) return null
    const headerCliente = [
        { name: 'id', },
        { name: 'Nombre', },
        { name: 'Telefono', },
        { name: 'Correo', },
        { name: 'actions' }
    ]
    const handleClick = (item) => {
        setSelectCliente(item)
        onClose(true)
    }
    return (
            <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className='bg-white p-2 rounded-lg'>
                    <div class="w-full h-auto bg-gray-100 rounded-xl">
                        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div class="flex flex-col">
                                <div class="mb-4 flex flex-wrap flex-grow justify-between">
                                    <h1 class="text-3xl font-bolder leading-tight text-gray-900">Clientes</h1>
                                    <button onClick={handleOnClose} className='text-white bg-indigo-600 hover:bg-indigo-500 font-medium rounded-md px-4 py-2'>x</button>
                                </div>
                                <div class="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                                    <div class="flex items-center py-2 w-1/2">
                                        <input value={query} onChange={(e) => setQuery(e.target.value)}
                                         class="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-searcg" type="text" placeholder="Search" />
                                    </div>
                                    <div class="flex items-center py-2">
                                        <a onClick={()=>setIsNewClient(true)}
                                            class="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline" >
                                            Crear nuevo cliente
                                            
                                        </a>
                                    </div>
                                </div>
                                {isNewClient ? 
                                <ClienteNew setIsNewClient={setIsNewClient} 
                                getClientes={getClientes} />: ""
                                }
                                <Pagination
                clientPerPage={clientPerPage}
                allClient={cliente.length}
                pagination={pagination}
                currentPage={currentPage}
            />
                                <div class="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                    <div class="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                                        <table class="min-w-full">
                                            <thead>
                                                <tr class="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                                    {headerCliente.map((item) => (
                                                        <th class="px-6 py-3 text-left font-medium">
                                                            {item.name}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                {currentCliente.map((item) => (
                                                    <tr>
                                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <div class="text-sm leading-5 text-gray-900">
                                                                {item.id}
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <div class="text-sm leading-5 text-gray-900">
                                                                {item.nombre_completo}
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <div class="text-sm leading-5 text-gray-900">
                                                                {item.telefono}
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <div class="text-sm leading-5 text-gray-900">
                                                                {item.correo}
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <button onClick={() => handleClick(item)} className='text-white bg-indigo-600 hover:bg-indigo-500 font-medium rounded-md px-4 py-2'>+</button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Modal