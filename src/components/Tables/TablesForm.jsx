import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
const TablesForm = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [tableInfo, setTableInfo] = useState(
        {
            tableName: '',
            capacity: '',
            location: '',
            comment: ''
        }
    );
    const [success, setSuccess] = useState(false);
    const [loader, setLoader] = useState(false);
    console.log(tableInfo)
    useEffect(() => {
        const getTableInfo = async () => {
            if (params.id) {
                const selectedTable = await axios.get(`https://reservasrestfullapp.onrender.com/api/mesa/mostrar/${params.id}`);
                if (selectedTable.data) {
                    setTableInfo(prevTableInfo => ({
                        ...prevTableInfo,
                        tableName: selectedTable.data.nombre_completo,
                        capacity: selectedTable.data.capacidad,
                        location: selectedTable.data.ubicacion,
                        comment: selectedTable.data.comentario
                    }));
                    console.log(selectedTable.data.location);
                    setLoader(true)
                }
            }
        };
        getTableInfo();
    }, [params.id]);
    //---------------------------------------------------------------  add and edit functions
    function addTable(table) {

        axios.post('https://reservasrestfullapp.onrender.com/api/mesa/crear/', table)
            .then(response => {

                navigate('/')

            })
            .catch(error => {
                console.log('eror agregar mesita');
            });
    }
    //----------------------------------------------------------------------
    async function updateTable(table) {
        const updatedTable = table

        try {
            const response = await axios.put(`https://reservasrestfullapp.onrender.com/api/mesa/editar/${params.id}`, updatedTable);
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    //---------------------------------------------------------------
    return (
        (loader || !params.id) &&
        <div className='flex flex-col  items-center' >
            <h2 className=' mt-3 text-xl'>{params.id ? 'ACTUALIZAR MESA' : "CREAR MESA"}</h2>
            <Formik
                initialValues={tableInfo}
                validate={(val) => {
                    let errors = {}

                    if (!val.tableName) {
                        errors.tableName = "Por favor ingresa nuevo numero de mesa"
                    } else if (!/^[\w\s-]+$/u.test(val.tableName)) {
                        errors.tableName = "Por favor ingresa numero valido "
                    }
                    if (!val.capacity) {
                        errors.capacity = "Por favor ingresa cantidad de personas"
                    } else if (!/^[1-9]\d*$/.test(val.capacity)) {
                        errors.capacity = "Por favor ingresa numero valido "
                    }
                    if (!val.location) {
                        errors.location = "Por favor ingresa una location"
                    } else if (!/^[a-zA-Z\s]+$/.test(val.location)) {
                        errors.location = "Por favor ingresa location valida"
                    }
                    if (!val.comment) {
                        errors.comment = "Por favor ingresa comment"
                    } else if (!/^[a-zA-Z\s]+$/.test(val.comment)) {
                        errors.comment = "No valido"
                    }
                    return errors
                }}
                onSubmit={(values) => {
                    console.log(values)
                    const table = {
                        nombre_completo: values.tableName,
                        capacidad: values.capacity,
                        ubicacion: values.location,
                        comentario: values.comment
                    }
                    try {

                        if (!params.id) {
                            addTable(table)
                        } else {
                            updateTable(table)
                        }

                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false);
                        }, 3000);

                        navigate('/')

                    } catch (err) { console.log(err) }
                }}>
                {({ errors }) => (<Form className="flex flex-col items-center  my-4 space-y-1  bg-gray-600  px-3 rounded-lg  md:w-[40%] py-3" action="#" method="POST">
                    <div>
                        <label htmlFor="tableName" className="block text-center  text-base font-medium text-white-700"> Nombre de mesa </label>

                        <div className="mt-1">
                            <Field
                                id="tableName"
                                name="tableName"
                                type="text"

                                className="px-2 text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"></Field>
                        </div>
                    </div>
                    <ErrorMessage name="tableName" component={() => (<div className='text-sm text-pink-200' > <h2>{errors.tableName}</h2></div>)} />

                    <div>
                        <label htmlFor="capacity" className="block text-center  text-base font-medium text-white-700"> capacity</label>
                        <div className="mt-1">
                            <Field
                                id="capacity"
                                name="capacity"
                                type="number"

                                className="px-2 text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"></Field>
                        </div>
                    </div>
                    <ErrorMessage name="capacity" component={() => (<div className='text-sm text-pink-200' > <h2>{errors.capacity}</h2></div>)} />

                    <div>
                        <label htmlFor="location" className="block text-center text-base font-medium text-white-700 "> location</label>
                        <span className='text-center '>Interior / exterior / terraza</span>
                        <div className="mt-1">
                            <Field
                                id="location"
                                name="location"
                                type="numbtexter"

                                className="px-2 text-base  text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"></Field>
                        </div>
                    </div>
                    <ErrorMessage name="location" component={() => (<div className='text-sm text-pink-200' > <h2>{errors.location}</h2></div>)} />


                    <div>
                        <label htmlFor="comment" className="block text-center  text-base font-medium text-white-700"> comment</label>

                        <div className="mt-1">
                            <Field
                                id="comment"
                                name="comment"
                                type="text"

                                className="px-2 text-base text-gray-300 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none  focus:border-sky-500  outline-none"></Field>
                        </div>
                    </div>
                    <ErrorMessage name="comment" component={() => (<div className='text-sm text-pink-200' > <h2>{errors.comment}</h2></div>)} />

                    <div className='flex justify-center pt-8 ' >
                        <button
                            type="submit"
                            className="flex my-4  items-center justify-center  px-11 py-1 text-lg font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-600 rounded-xl hover:bg-teal-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{params.id ? 'Actualizar' : "Crear"}</button>
                    </div>
                    {success && <div className='text-lime-300 pb-2'>Mesa Creada con exito !</div>}
                </Form>)}
            </Formik>
        </div>
    )
}


export default TablesForm
