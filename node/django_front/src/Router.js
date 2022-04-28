import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import MapArea from "./components/MapArea";
import VendorInfo from "./components/VendorInfo";
import VendorRegistSteppers from "./components/VendorRegistSteppers";
import ErrorPage from "./components/ErrorPage";
import SignInForFirebase from "./components/SignInForFirebase"
import PrivateRoute from "./PrivateRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MapArea/>}/>
                <Route path="/vendors/:id" element={<VendorInfo/>}/>
                <Route path="/error" element={<ErrorPage />}/>
                <Route path="/signin" element={<SignInForFirebase />}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/vendors/regist" element={<VendorRegistSteppers/>}/>
                    <Route path="/vendors/update/:id" element={<VendorRegistSteppers updFlg="true" />}/>
                </Route>
            </Routes> 
        </BrowserRouter>
    )
}
export default Router;