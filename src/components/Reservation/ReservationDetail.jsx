import React from 'react'

const ReservationDetail = () => {
  return (
    <div className=' flex flex-col justify-center '>
      <h2 className='my-8 text-3xl'>Reservation Detail</h2>
      {/* 
    

       */}

       <div className=" bg-gray-700 rounded-lg shadow-md p-4 w-[80%] md:w-[60%] text-slate-100 mx-auto ">
     
      <ul className="list-none">
        <li className="flex items-center mb-2">
          <span className="w-1/3 text-gray-200">Nombre:</span>
          <span className="w-2/3">NAME</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="w-1/3 text-gray-200">Fecha:</span>
          <span className="w-2/3">DATE</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="w-1/3 text-gray-200">Hora:</span>
          <span className="w-2/3">TIME</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="w-1/3 text-gray-200">Número de invitados:</span>
          <span className="w-2/3">GUEST</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="w-1/3 text-gray-200">Teléfono:</span>
          <span className="w-2/3">TELEPHONE</span>
        </li>
        <li className="flex items-center mb-2">
          <span className="w-1/3 text-gray-200">Notas:</span>
          <span className="w-2/3">NOTES</span>
        </li>
      </ul>
    </div>

    </div>
  )
}

export default ReservationDetail
