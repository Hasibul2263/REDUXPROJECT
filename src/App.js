import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Pages/Layout/Header/Header';
import Footer from './Pages/Layout/Footer/Footer';
// import Login from './Pages/Auth/Login/Login';
// import Signup from './Pages/Auth/Signup/Signup';
// import Product from './Pages/CMS/Product/Product';
// import List from './Pages/CMS/List/List';
import { Suspense, lazy, useEffect } from "react";
// import {check_token}
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Update from './Pages/CMS/Update/update';
const Login = lazy(() => import("../src/Pages/Auth/Login/Login"));
const Signup = lazy(() => import("../src/Pages/Auth/Signup/Signup"));
const Product = lazy(() =>
  import("../src/Pages/CMS/Product/Product")
);
const List = lazy(() => import("../src/Pages/CMS/List/List"));


function App() {
  const dispatch = useDispatch();

  function PrivateRoute({ children }) {
    console.log(children, "children");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please go for login either you can't access product list")}
      </>
    );
  }
  const PublicRouteNames = [
    {
      path: "/signup",
      Component: <Signup />,
    },

    {
      path: "/",
      Component: <Login />,
    },

  ];

  const PrivateRouteNames = [
    {
      path: "/product",
      Component: <Product />,
    },

    {
      path: "/list",
      Component: <List />,
    },
    {
      path: "/update/:id",
      Component: <Update />
    }

  ];

  // useEffect(() => {
  //   dispatch(check_token());
  // }, [dispatch]);
  return (
    // <div className="App">

    //  <BrowserRouter>
    // <Header/>
    // <Routes>
    //   <Route path='/' element={<Login/>}/>
    //   <Route path='/Signup' element={<Signup/>}/>
    //   <Route path='/Product' element={<Product/>} />
    //   <Route path='/List' element={<List/>}  />

    // </Routes>
    //  <Footer/>
    // </BrowserRouter> 

    // </div>

    <>
      <Suspense fallback={<h2>Loading.....</h2>}>
        <BrowserRouter>
          <Header />
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route exact path={route.path} element={route.Component} />
              );
            })}

            {PrivateRouteNames?.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route.Component}</PrivateRoute>}
                />
              );
            })}
          </Routes>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </>

  );
}

export default App;
