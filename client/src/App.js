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
function App() {

  return (

    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/dressComponent' element={<DressComponent />} />
          <Route path='/contactForm' element={<ContactForm />} />
          <Route path='/catalog/choose' element={<Choose />} />
          <Route path='/catalogm' element={<Catalogm />} />
          <Route path='/rent' element={<RentDress />} />
          <Route path='/rentm' element={<RentDressm/>} />
          <Route path='/rentPage' element={<RentPage/>} />
          <Route path='/renting' element={<Renting/>}/>



        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
