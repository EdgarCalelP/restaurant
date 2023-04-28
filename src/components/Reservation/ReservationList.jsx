import React, { useState, useEffect } from 'react'
import '../../assets/css/reservation.css'
import axios from 'axios'

const ReservationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reservation, setReservation] = useState([])
  const [reservationsPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(false);
  
  // const reservations = [
  //   { id: 1, customer: 'Carlos', date: 'febrero', time: '2:00', people: 4, tableNum: 17 },
  //   { id: 2, customer: 'John', date: 'marzo', time: '3:00', people: 2, tableNum: 12 },
  //   { id: 3, customer: 'Mary', date: 'abril', time: '6:00', people: 5, tableNum: 8 },
  //   { id: 4, customer: 'David', date: 'mayo', time: '7:00', people: 3, tableNum: 3 },
  //   { id: 5, customer: 'Sarah', date: 'junio', time: '8:00', people: 6, tableNum: 9 },
  //   { id: 6, customer: 'Karen', date: 'julio', time: '9:00', people: 2, tableNum: 6 },
  //   { id: 7, customer: 'Mark', date: 'agosto', time: '1:00', people: 4, tableNum: 14 },
  //   { id: 8, customer: 'Rachel', date: 'septiembre', time: '4:00', people: 3, tableNum: 10 },
  //   { id: 9, customer: 'Tom', date: 'octubre', time: '5:00', people: 5, tableNum: 7 },
  //   { id: 10, customer: 'Emily', date: 'noviembre', time: '7:00', people: 2, tableNum: 4 },
  //   { id: 11, customer: 'Michael', date: 'diciembre', time: '8:00', people: 6, tableNum: 11 },
  //   { id: 12, customer: 'Jessica', date: 'enero', time: '9:00', people: 2, tableNum: 5 },
  // ];

  const headerTable =[
    { name: 'Cliente', },
    { name: 'Fecha', },
    { name: 'Hora', },
    { name: 'Personas', },
    { name: 'Mesa', },
    { name: 'Acciones', },
  ]
const getReservation = async()=>{
  const {data} = await axios(`http://reservasrestfullapp.onrender.com/api/reserva/listar/` )
  console.log('reservation: ---> ',data)
  setReservation(data)
}

 useEffect(()=>{
getReservation()
}, [])

  // Get current reservations
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservation?.slice(indexOfFirstReservation, indexOfLastReservation);

  // Change page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservation.length / reservationsPerPage); i++) {
    pageNumbers.push(i);
  }
  function handlePagination(num) {
    setCurrentPage(num)
    setSelectedPage(num)
  }
  return (
    <div className='px-8 flex-col justify-center md:w-full reservationBody'>
      <div className='flex justify-center'>
        <h2 className=' my-9 bg-zinc-950 text-slate-300 p-3 rounded-md mx-4'>LISTA DE RESERVACIONES</h2>
        <button className=' my-auto bg-[#074430] hover:bg-[#035a3d] rounded-lg font-bold px-3 py-2  text-slate-300 text-xs md:text-sm'>
          Crear
        </button>
      </div>
      <div className=' mx-auto table-responsive block drop-shadow-md '>
        <table className='w-full md:w-auto sm:w-auto lg:w-4/5 leading-normal mx-auto '>
          <thead >
            <tr>
              {
                headerTable.map((item)=>(
                  <th className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>{item.name}</th>
                ))
              }
          </tr>
          </thead>
          <tbody >
            {currentReservations?.map((reservation) => (
              <tr key={reservation.id} className=' border-gray-200 bg-gray-100 mx-auto'>
                <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation?.cliente?.nombre_completo}</td>
                <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation.fecha}</td>
                <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation.hora}</td>
                <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation.cantidadDePersonas}</td>
                
                <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation?.mesa?.nombre_completo}</td>
                <td className="w-2/5 sm:w-1/3 lg:w-auto  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center">
                  <button  type="button" className=" text-gray-500 hover:text-gray-700" >
                    <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                    </svg>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
        <div class="container mx-auto px-4 py-4">
          <nav class="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
            {/* <a class="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" href="#" title="Previous Page" onClick={() => handlePagination(currentPage -1)}>
        <span class="sr-only"  >Previous Page</span>
        <svg class="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
        </svg>
    </a> */}
            {pageNumbers.map((num, index) => (
                <a 
                className={`hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white  hover:border-gray-300 ${num === selectedPage ? 'text-red-500 font-bold' : ''}`}
                  onClick={() => handlePagination(num)}>
                  {num}
                </a>
              ))
            }
            {/* <a class="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" href="#" title="Next Page">
        <span class="sr-only">Next Page</span>
        <svg class="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
        </svg>
    </a> */}
          </nav>
        </div>
    </div>
  );
}

export default ReservationList

