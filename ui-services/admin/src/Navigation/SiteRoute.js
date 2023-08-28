import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import BusManagement from "../Pages/BusManagement/Index";
import AddBus from "../Pages/BusManagement/AddBus";
import AddAndViewRoutes from "../Pages/RouteManagement/AddAndViewRoutes";
import RouteManagement from "../Pages/RouteManagement/Index";
import UpdateBus from "../Pages/BusManagement/UpdateBus";
import ViewBusList from "../Pages/BusManagement/ViewBusList";

// import { Container } from './styles';

export default function SiteRoute() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/routemanagement" element={<RouteManagement />} />
      <Route path="/routemanagement/addnewroute" element={<AddAndViewRoutes />} />
      <Route path="/busmanagement" element={<BusManagement />} />
      <Route path="/busmanagement/addnewbus" element={<AddBus />} /> 
      <Route path="/busmanagement/updatebus" element={<UpdateBus />} /> 
      <Route path="/busmanagement/viewallbus" element={<ViewBusList />} /> 
    </Routes>
  );
}
