import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import MapArea from "./components/MapArea";
import VendorInfo from "./components/VendorInfo";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MapArea/>}/>
                <Route path="/vendors/:id" element={<VendorInfo/>}/>
            </Routes> 
        </BrowserRouter>
    )
}
export default Router;