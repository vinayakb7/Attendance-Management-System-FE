import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Components/Sidebar";
import Attendence from "./Pages/Attendence";
import Home from "./Pages/Home";
import NavbarUp from "./Components/NavbarUp";
import Tabular_view from "./Pages/Tabular_view";
import Tabular_monthView from "./Pages/Tabular_monthView";
import Calender_View from "./Pages/Calender_View";
import List_view from "./Pages/List_view";


function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <NavbarUp/>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Tabular_view" element={<Tabular_view />} />
          <Route path="/Tabular_monthView" element={<Tabular_monthView />} />
          <Route path="/Calender_View" element={<Calender_View/>} />
          <Route path="/List_view" element={<List_view/>} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
