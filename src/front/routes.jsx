import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/ProtectedRoute";
import Favorites from "./pages/Favorites";
import SearchResults from "./components/SearchResults";
import Genre from "./components/Genre";
import MovieDetails from "./components/Details"; 

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
      <Route path="/genre" element={<PrivateRoute><Genre /></PrivateRoute>} />
      <Route path="/movie/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
      <Route index element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Route>
  )
);
