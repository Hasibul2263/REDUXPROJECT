import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons'
import loginImg from '../../../ImgFolder/loginImg.jpg';


export default function Login() {
   console.log(loginImg)
  const { redirectTo } = useSelector((state) => state.Auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [pass, setpass] = useState(true);
  const togglepass = (e) => {
    e.preventDefault();
    setpass(!pass);
  }
  const [data, setdata] = useState({
    email: "",
    password: "",
  })
  const [error, seterror] = useState("")
  let name, value
  const valuesetting = (e) => {
    name = e.target.name
    value = e.target.value
    if (name === "email") {
      if (value.length === 0) {
        seterror({ ...error, email: "please write email" })
        setdata({ ...data, email: "" })
      }
      else {
        seterror({ ...error, email: "" })
        setdata({ ...data, email: value })
      }
    }
    else if (name === "password") {
      if (value.length === 0) {
        seterror({ ...error, password: "please write password" })
        setdata({ ...data, password: "" })
      } else {
        setdata({ ...data, password: value })
        seterror({ ...error, password: "" })
      }
    }
  }

  const validation = () => {
    let error = {}
    if (!data.password) {
      error.password = "password is required"
    }
    if (!data.email) {
      error.email = "email is required"
    }
    return error
  }
  const submit = (e) => {
    const formdata = new FormData();
    e.preventDefault();
    seterror(validation);
    setdata(data)
    validation();
    formdata.append("email", data.email)
    formdata.append("password", data.password)
    dispatch(signin(formdata))

  }
  

  useEffect(() => {
    const RedirectUser = () => {
      let token = localStorage.getItem("token");
      let isInLoginPage = window.location.pathname.toLowerCase() === "/";

      if (token !== null && token !== undefined && token !== "") {
        isInLoginPage && navigate("/list");
      }
    };

    RedirectUser();
  }, [navigate, redirectTo]);
  console.log(redirectTo, "redirectTo")



  return (

    <>
      <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">

          <div class="d-flex justify-content-between align-items-center">
            <h2>About</h2>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/list">Product List</Link></li>
            </ol>
          </div>

        </div>
      </section>
      <div className='container loginContainer'>
        <img src={loginImg} alt="" srcset="" />
        <form onSubmit={submit}  className='mx-auto loginForm'>
          <div className="form-group">
            <h4 className='text-center loginHeading'>Login </h4>
            <label for="exampleInputEmail1" className='loginLabel'>Email address</label>
            <input type="email" name='email' value={data.email} onChange={valuesetting} class="form-control loginFormControl" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <span style={{ color: "red" }}>{error.email}</span>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.<br/></small>
          </div>
          <br/>
          <div class="form-group">
            <label for="exampleInputPassword1 " className='loginLabel'>Password</label>
            <input type={pass ? "password" : "text"} name="password" value={data.password} onChange={valuesetting} class="form-control loginFormControl" id="exampleInputPassword1" />
            <span style={{ color: "red" }}>{error.password}</span>
          </div>
          <div className='mt-3  '>
            <small  onClick={togglepass} >{pass?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye} />}</small >
          </div>
          <div class="form-group form-check mt-2">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label className="form-check-label " for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-success mt-3 loginbtn">Log In</button>
          <br/>
          <br/>
          <h5 style={{ fontSize: "16px", margin: "0px 10px" }} >Don't have an account?<br/><Link to='/signup'>Sign Up</Link></h5>
        </form>




      </div>

    </>
  )
}
