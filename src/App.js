import { Route, Routes } from 'react-router-dom'
import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import ReservationDetail from './components/Reservation/ReservationDetail';
import ReservationForm from './components/Reservation/ReservationForm';
import ReservationList from './components/Reservation/ReservationList';
import TablesForm from './components/Tables/TablesForm';

// import TablesMesasID from './components/Tables/TablesMesasID';
import TablesListarMesas from './components/Tables/TablesListarMesas';
import Equipo from './components/Equipo/Equipo';

import TablesMesas from './components/Tables/TablesMesas';


function App() {
  return (
    <div className="h-full  overflow-hidden">
      <Navbar />
      <div  >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tablesform" element={<TablesForm />} />
          <Route path="/tablesform/:id" element={<TablesForm />} />
          <Route path="/reservationform" element={<ReservationForm />} />
          <Route path="/reservationform/:id" element={<ReservationForm />} />
          <Route path="/reservationlist" element={<ReservationList />} />
          <Route path="/reservationdetail" element={<ReservationDetail />} />

          {/* <Route path="/tableID/:id" element={< TablesMesasID />} /> */}
          <Route path="/tablesList" element={< TablesListarMesas />} />
          <Route path="/equipo" element={<Equipo/>}/>

          <Route path="/tablesmesas" element={<TablesMesas />} />

        </Routes>
      </div>
    </div>
  );
}
export default App;