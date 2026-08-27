import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { Route , RouterProvider, createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

// auth
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import GenreList from './pages/Admin/GenreList.jsx'
import CreateMovie from './pages/Admin/CreateMovie.jsx'

// restricted user
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import Home from './pages/User/Home.jsx';
import VerifyEmail from './pages/Auth/VerifyEmail.jsx'
import ResendVerification from './pages/Auth/ResendVerification.jsx'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminMoviesList from './pages/Admin/AdminMoviesList.jsx'
import UpdateMovie from './pages/Admin/UpdateMovie.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MovieDetails from './pages/Movies/MovieDetails.jsx'
import AllComments from './pages/Admin/AllComments.jsx'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import ResetPassword from "./pages/Auth/ResetPassword";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/verify-email/:token' element={<VerifyEmail />} />
            <Route path='/resend-verification' element={<ResendVerification />} />
            <Route path='/movies' element={<AllMovies/>}/>
            <Route path='/movies/:id' element={<MovieDetails/>}/>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            
            <Route path='' element={<PrivateRoute />} > 
              <Route path='/profile' element={<Profile/>} />
            </Route>

            <Route path='' element={<AdminRoute/>}>
                <Route path='/admin/movies/genres' element={<GenreList/>}/>
                <Route path='/admin/movies/create' element={<CreateMovie/>}/>
                <Route path='/admin/movie-list' element={<AdminMoviesList/>}/>
                <Route path='/admin/movies/update/:id' element={<UpdateMovie/>}/>
                <Route path='/admin/movies/dashboard' element={<AdminDashboard/>}/>
                <Route path='/admin/movies/comments' element={<AllComments/>}/>
            </Route>
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
