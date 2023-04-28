import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { title: "Mostrar Agenda", path: "/reservationlist", icon: "calendar_month" },
    { title: "Crear Mesas ", path: "/tablesform", icon: "table_view" },
    { title: "Mesa ID", path: "/tableID", icon: "table_view" },
    { title: "Resevaciones", path: "/reservationform", icon: "table_view" },
    { title: "Lista Mesas", path: "/tablesList", icon: "table_view" },

  ];
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap  p-6 bg-[#000000]  bg-gradient-to-r from-[#021818] to-[#311a1a] shadow-xl">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span class="material-icons 
              pr-2 inline-block align-middle">restaurant</span>
        <Link to="/" className="font-semibold text-xl tracking-tight">
        House stonehenge
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-teal-100 border-teal-100 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${isOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-3`}
      >
        <div className="text-sm lg:flex-grow inline-block align-middle ">
          {menus.map((item, index) => (
            <>
              <span class="material-icons text-teal-100
              pr-2 inline-block align-middle">{item.icon}</span>
              <Link
                key={index}
                to={item.path}
                className=" block mt-4 lg:inline-block lg:mt-0 text-lg font-semibold text-white hover:text-white mr-4 
              pr-4 align-middle"
              >
                {item.title}
              </Link>     
            </>
          ))
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


