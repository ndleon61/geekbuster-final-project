// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login/>}/>
        
        
      </Route>
    )
);