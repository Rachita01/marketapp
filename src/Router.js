import React from "react";
import {Route,Routes} from 'react-router-dom';
import HomeComponent from "./components/HomeComponent/HomeComponent";
import PCMarket from "./components/PCMarket/PCMarket";

const Router = () => (
  <Routes>
    <Route path='' element={<HomeComponent/>}/>
    <Route path='/pcmarket' element={<PCMarket/>}/>
  </Routes>
);

export default Router