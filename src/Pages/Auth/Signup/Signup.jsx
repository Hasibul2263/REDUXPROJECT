import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../Redux/AuthSlice';
import { Link } from 'react-router-dom';
import './Signup.css'


export default function Signup() {
  const dispatch = useDispatch();
  const [img, setimg] = useState()
  const [error, seterror] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  let name, value
  const valueSetting = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "firstName") {
      if (value.length === 0) {
        setdata({ ...data, firstName: "" })
        seterror({ ...error, firstName: "First Name is important " })
      }
      else {
        setdata({ ...data, firstName: value })
        seterror({ ...error, firstName: "" })
      }

    }
    else if (name === "lastName") {

      if (value.length === 0) {
        setdata({ ...data, lastName: "" })
        seterror({ ...error, lastName: "Last Name is important " })
      }
      else {
        setdata({ ...data, lastName: value })
        seterror({ ...error, lastName: "" })
      }

    }
    else if (name === "email") {
      if (value.length === 0) {
        setdata({ ...data, email: "" })
        seterror({ ...error, email: "Last Name is important " })
      }
      else {
        setdata({ ...data, email: value })
        seterror({ ...error, email: "" })
      }

    }
    else if (name === "password") {
      if (value.length === 0) {
        setdata({ ...data, password: "" })
        seterror({ ...error, password: "Last Name is important " })
      }
      else {
        setdata({ ...data, password: value })
        seterror({ ...error, password: "" })
      }
    }
  }
  const validation = () => {
    let error = {}
    if (!data.firstName) {
      error.firstName = " Firstname is required";
    }
    if (!data.lastName) {
      error.lastName = " Lastname is required";
    }
    if (!data.email) {
      error.email = " Email is required";
    }
    if (!data.password) {
      error.password = " password is required";
    }
    return error
  }
  const submit = (e) => {
    e.preventDefault();
    seterror(validation());
    setdata(data)
    let formdata = new FormData();
    formdata.append("first_name", data.firstName)
    formdata.append("last_name", data.lastName)
    formdata.append("email", data.email)
    formdata.append("password", data.password)
    formdata.append("profile_pic", img)
    dispatch(register(formdata))
  }
  console.log(FormData)
  return (


    <>
      <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">

          <div class="d-flex justify-content-between align-items-center">
            <h2>About</h2>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/List">Product List</Link></li>
            </ol>
          </div>

        </div>
      </section>
      <form style={
        { marginTop: "20px", marginLeft: "10px" }
      } className='signupForm mx-auto'>
        <h4 className='text-center sihnupHeader'>Sign Up</h4>
        <div class="form-group">
          <label for="exampleInputPassword1" style={{ color: "blue", fontSize: "20px", fontWeight: "Bold" }}  >First Name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={valueSetting}
            class="form-control signupFormControl"
            id="exampleInputPassword1"
            placeholder="Enter your First Name"
          />
          <span style={{ color: "red" }}>{error.firstName}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" style={{ color: "blue", fontSize: "20px", fontWeight: "Bold" }}  >Last Name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={valueSetting}
            class="form-control signupFormControl"
            id="exampleInputPassword1"
            placeholder="Enter your Last Name"
          />
        </div>
        <span style={{ color: "red" }}>{error.lastName}</span>
        <div class="form-group">
          <label for="exampleInputEmail1" style={{ color: "blue", fontSize: "20px", fontWeight: "Bold" }}   >Email address</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={valueSetting}
            class="form-control signupFormControl"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter a valid email"
          />
          <span style={{ color: "red" }}>{error.email}</span>
          <small id="emailHelp" class="form-text text-muted "  >
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" style={{ color: "blue", fontSize: "20px", fontWeight: "Bold" }} >Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={valueSetting}
            class="form-control  signupFormControl"
            id="exampleInputPassword1"
            placeholder="Enter password"
          />
          <span style={{ color: "red" }}>{error.password}</span>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setimg(e.target.files[0])}
            name="img"
            accept="image/*"
            className="form-control signupImgAdd"
          />
          {img !== "" && img !== undefined && img !== null ? (
            <img
              style={{ height: "180px" }}
              src={URL.createObjectURL(img)}
              alt=""
              className="upload-img signupImg"
            />
          ) : (
            <>{img === "" && <p>Drag or drop content here</p>}</>
          )}
        </div>

        <br />
        <div>
          <button type="submit" onClick={submit} class="btn btn-success signupBtn">
            Sign Up
          </button>
        </div>
        <br/>
        <h5 style={{ fontSize: "16px", margin: "0px 10px" }}>Already have an account?<Link to='/'>Login</Link></h5>
      </form>




    </>
  )
}
