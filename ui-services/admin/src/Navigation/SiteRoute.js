import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import RouteManagement from "../Pages/RouteManagement/Index";
import BusManagement from "../Pages/BusManagement";
import AddBus from "../Pages/BusManagement/AddBus";

// import { Container } from './styles';

export default function SiteRoute() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/routemanagement" element={<RouteManagement />} />
      <Route path="/busmanagement" element={<BusManagement />} />
      <Route path="/busmanagement/addnewbus" element={<AddBus />} /> busmanagement/addnewbus 
    </Routes>
  );
}
