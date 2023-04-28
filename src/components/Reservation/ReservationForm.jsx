import React, { useState, useEffect } from 'react'
import axiosService from '../../utils/axios.service'
import { useFormik } from 'formik';
import MyModal from './modal'
import ModalReservationList from './modalReservationList'
import ReservationList from './ReservationList'

const ReservationForm = () => {
    const [reservation, setReservation] = useState([])
    const [clientes, setClientes] = useState([])
    const [selectCliente, setSelectCliente] = useState("");
    const [reservationList, setReservationList] = useState([])
    const [dateSelected, setDateSelected] = useState(null)
const [mesas, setmesas] = useState([])
const [selectedValue, setSelectedValue] = useState('');

    const [showMyModal, setshowMyModal] = useState(false)
    const [showModalReservation, setshowModalReservation] = useState(false)
    const handleOnClose = () => setshowMyModal(false)
    const handleOnCloseR = () => setshowModalReservation(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            table: '',
            date: '',
            time: '',
            people: '',
            comment: '',
        },
        validate: (val) => {
            let errores = {}
            // // validaion name
            // if (!val.name) {
            //     errores.name = 'Por favor ingresa un nombre'
            // } else if (!/^[a-zA-Z0-9_]$/.test(val.name)) {
            //     errores.name = 'El nombre solo puede tener letras y espacios'
            // }
            // validation fecha
            if (!val.date) {
                errores.date = 'Por favor ingresa una fecha'
            } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(val.date)) {
                errores.date = 'Por favor ingresa un formato valido "dd/mm/aaaa"'
            }
            // validation time
            if (!val.time) {
                errores.time = 'Por favor ingresa una hora'
            } else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(val.time)) {
                errores.time = 'Por favor ingresa un formato valido  "00:00"'
            }
            // validation people
            if (!val.people) {
                errores.people = 'Por favor ingresa una hora'
            } else if (val.people > 50) {
                errores.people = ' Cantidad maximo 6 Personas'
            }
            // validation table
            // if (!val.table) {
            //     errores.table = 'Por favor ingresa la mesa'
            // } else if (val.table > 30) {
            //     errores.table = 'Por favor ingresa otro numero de mesa'
            // }
            return errores
        },
        onSubmit: async (valores, { resetForm }) => {
            resetForm()
            setClientes(null)
            setReservation(valores)
            const data = await axiosService.post("/api/reserva/crear/",
                {
                    "cliente": {
                        "id": selectCliente?.id
                    },
                    "mesa": {
                        "id": parseInt(selectedValue)
                    },
                    "fecha": formik.values.date,
                    "hora": formik.values.time,
                    "cantidadDePersonas": formik.values.people,
                    "comentario": formik.values.comment
                })
            console.log(data)
            setSuccess(true)
        }
    })
    const getClientes = async () => {
        try {
            const clientes = await axiosService.get("/api/cliente/listar")
            setClientes(clientes)
        } catch (error) {
            console.log(error)
        }
    }
    const checkReservationDate = async () => {
        try {
            const reservation = await axiosService.get(`/api/reserva/listarfecha/${formik.values.date}`)
            console.log(reservation)
            setReservationList(reservation)
        } catch (error) {
            console.log(error)
        }
    }

    const getMesas = async ()=>{
        const data = await axiosService.get('/api/mesa/listar/')
        setmesas(data)
    }
    useEffect(() => {
        getMesas()
    }, [])
    
    const [success, setSuccess] = useState(false);
    return (
        <div className='flex flex-row'>
            <div className='basis-2/4'>
                <ReservationList />
            </div>
            <div className='basis-2/4'>
                <div className='flex flex-col  items-center' >
                    <h2 className='mt-3 text-xl bg-[#02130d] text-slate-300 p-3 rounded-lg'>Agendar reservación</h2>
                    <form className="flex flex-col items-center  my-4 space-y-1  bg-gray-300  px-3 rounded-lg  w-auto py-3" onSubmit={formik.handleSubmit} >
                        <div>
                            <label htmlFor="name" className="block text-base font-medium  text-center text-white-700"> Nombre </label>
                            <div className="mt-1 flex flex-wrap flex-grow justify-around">
                                <input
                                    disabled
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="flex mb-0 px-2 mx-auto  text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"
                                    onChange={formik.handleChange}
                                    value={formik.values.name = selectCliente.nombre_completo}
                                >
                                </input>
                                <button
                                    type="button"
                                    className='text-white bg-green-500 hover:bg-indigo-500 rounded-lg px-2 '
                                    onClick={() => { setshowMyModal(true); getClientes() }}
                                >search</button>
                            </div>

                            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                            {/* <ErrorMessage name="name" component={()=> (<div className='text-sm text-pink-200' > <h2>{formik.errors.name}</h2></div>)}/> */}
                        </div>
                        <div className='flex flex-wrap flex-grow '>
                            <div className='px-2'>
                                <label htmlFor="date" className="block text-center text-base font-medium text-white-700"> Fecha </label>
                                <div className="mt-1">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        className="flex px-2  text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"
                                        onChange={formik.handleChange}
                                        // onClick={setDateSelected(formik)}
                                        value={formik.values.date}
                                    >
                                    </input>
                                </div>
                                {formik.errors.date ? <div>{formik.errors.date}</div> : null}
                                {/* <ErrorMessage name="date" component={()=> (<div className='text-sm text-pink-200' > <h2>{formik.errors.date}</h2></div>)}/> */}
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-center text-base font-medium text-white-700"> Hora </label>
                                <div className="mt-1">
                                    <input
                                        id="time"
                                        name="time"
                                        type="time"
                                        className="flex px-2  text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"
                                        onChange={formik.handleChange}
                                        value={formik.values.time}
                                    >
                                    </input>
                                </div>
                                {formik.errors.time ? <div>{formik.errors.time}</div> : null}
                                {/* <ErrorMessage name="time" component={()=> (<div className='text-sm text-pink-200' > <h2>{formik.errors.time}</h2></div>)}/> */}
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className='text-white bg-green-500 hover:bg-indigo-500 rounded-lg px-2 '
                                onClick={() => { setshowModalReservation(true); checkReservationDate() }}
                            >Buscar disponibilidad</button>
                        </div>

                        <div>
                            <label htmlFor="people" className="block text-center text-base font-medium text-white-700"> N. Personas </label>
                            <div className="mt-1">
                                <input
                                    id="people"
                                    name="people"
                                    type="number"
                                    className="flex px-2  text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"
                                    onChange={formik.handleChange}
                                    value={formik.values.people}
                                >
                                </input>
                            </div>
                            {formik.errors.people ? <div>{formik.errors.people}</div> : null}
                            {/* <ErrorMessage name="people" component={()=> (<div className='text-sm text-pink-200' > <h2>{formik.errors.people}</h2></div>)}/> */}
                        </div>
                        <div>
                            <label htmlFor="people" className="block text-center text-base font-medium text-white-700"> Mesa </label>
                            <div className="">
                                <select value={selectedValue} onChange={(e) => {setSelectedValue(e.target.value);}} className='mx-auto mt-1  border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform' >
                                    <option name="table" className=' text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform' value="">Selecciona una opción</option>
                                    {
                                        mesas.map((item, index)=>(
                                            <option key={index} 
                                            name="table"
                                            
                                            value={item.id}
                                            className=' text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform' >{item.nombre_completo}</option>

                                        ))
                                    }
                                    
                                </select>
                                {/* <input
                                id="table"
                                name="table"
                                type="number"
                                className="flex mx-auto px-2  text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"
                                onChange={formik.handleChange}
                                value={formik.values.table}
                            >
                            </input> */}
                            </div>
                            {formik.errors.table ? <div>{formik.errors.table}</div> : null}
                            {/* <ErrorMessage name="table" component={()=> (<div className='text-sm text-pink-200' > <h2>{formik.errors.table}</h2></div>)}/> */}
                        </div>
                        <div>
                            <label htmlFor="people" className="block text-center text-base font-medium text-white-700"> Comentario </label>
                            <div className="mt-1">
                                <input
                                    id="comment"
                                    name="comment"
                                    className="flex mx-auto px-2  text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"
                                    onChange={formik.handleChange}
                                    value={formik.values.comment}
                                >
                                </input>
                            </div>
                            {/* <ErrorMessage name="table" component={()=> (<div className='text-sm text-pink-200' > <h2>{formik.errors.table}</h2></div>)}/> */}
                        </div>
                        <br />
                        <div className='flex justify-center ' >
                            <button
                                type="submit"
                                className="flex my-4  items-center justify-center  px-11 py-1 text-lg font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-600 rounded-xl hover:bg-teal-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Agendar</button>
                        </div>
                        {success && <div className='text-lime-300 pb-2'>Reservacion Creada con exito !</div>}
                    </form>
                    <MyModal
                        onClose={handleOnClose}
                        visible={showMyModal}
                        cliente={clientes}
                        setSelectCliente={setSelectCliente}
                        getClientes={getClientes}
                    />

                    <ModalReservationList
                        onClose={handleOnCloseR}
                        visible={showModalReservation}
                        list={reservationList} />
                </div>
            </div>


        </div>
    )
}
export default ReservationForm
