import './App.css'
import React from 'react';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import store from './store'
import Catalog from './components/Catalog';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Register from './components/Register';
import DressComponent from "./components/DressComponent"
import Navbar from "./components/Navbar"
import ContactForm from "./components/ContactForm"
import JewCalendar from "./components/JewCalender"
import Choose from "./components/ChooseDress"
import Catalogm from './components/manager/Catalogm';
import RentDress from './components/RentDress';
import RentDressm from './components/manager/RentDressm'
import RentPage from './components/manager/RentPage.jsx';
import Renting from './components/manager/Renting.jsx';
import EditDress from './components/manager/EditDress.jsx';
import RentedDressesList from "./components/manager/RentedDressList.jsx"
import AdminLogin from './components/manager/AdminLogin.jsx'
import PlaceDetails from "./components/PlaceDetails.jsx";
import HomePage from "./components/Home.jsx";
import RentalHistory from './components/manager/RentalHistory.jsx';
function App() {

  return (
<div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="content-container">
        <Routes>
        <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/rentList' element={<RentedDressesList />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/dressComponent' element={<DressComponent />} />
          <Route path='/contactForm' element={<ContactForm />} />
          <Route path='/catalog/choose' element={<Choose />} />
          <Route path='/catalogm' element={<Catalogm />} />
          <Route path='/rent' element={<RentDress />} />
          <Route path='/rentm' element={<RentDressm/>} />
          <Route path='/rentPage' element={<RentPage/>} />
          <Route path='/renting' element={<Renting/>}/>
          <Route path='/edit' element={<EditDress/>}/>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          <Route path='/history' element={<RentalHistory/>}/>
<Route></Route>

        </Routes>
        </div>
        <PlaceDetails/>
      </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;