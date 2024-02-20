import React from "react";
import {Route,Routes} from 'react-router-dom';
import HomeComponent from "./components/HomeComponent/HomeComponent";
import PCMarket from "./components/PCMarket/PCMarket";
import AdminComponent from "./components/AdminComponent/AdminComponent";

const Router = () => (
  <Routes>
    <Route path='' element={<HomeComponent/>}/>
    <Route path='/pcmarket' element={<PCMarket/>}/>
    <Route path='/adminhome' element={<AdminComponent/>}/>
  </Routes>
);

export default Router