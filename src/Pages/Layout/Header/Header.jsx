import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Token_remove } from '../../../Redux/AuthSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import { profile_pic } from '../../../Redux/Helper';





export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const image = localStorage.getItem("profile_pic")
  const firstName=localStorage.getItem("firstName")
  const { isToggle } = useSelector((state) => state.Auth);
  

  return (
    <header id="header" className="fixed-top headerBody">
      <div className="container d-flex align-items-center">

        <h1 className="logo mr-auto"><a href="index.html"><span>Com</span>pany</a></h1>
        <Link to=""><img src="../../../ass" alt="" srcset="" /></Link>
        {/* <a href="index.html" class="logo mr-auto"><img src="..\..\..\asset\img\loho.png" alt="" class="img-fluid"/></a>  */}

        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li >Home</li> <li>
              {isToggle ? (

                <Link onClick={() => dispatch(Token_remove())} to="/">
                  Logout
                </Link>

              ) : (
                <Link to="/">Welcome to Login Page</Link>
              )}</li>
              {isToggle ? <img src={profile_pic(image)} /> : "" }
            
            

          </ul>

        </nav>
        {/* <div>
          {isToggle && <img src={user(profile_pic)} />}
        </div> */}
        <div className="header-social-links">
          {/* <a href="#" class="twitter"><i class="icofont-twitter"></i></a>
            <a href="#" class="facebook"><i class="icofont-facebook"></i></a>
            <a href="#" class="instagram"><i class="icofont-instagram"></i></a>
            <a href="#" class="linkedin"><i class="icofont-linkedin"></i></a> */}


        </div>

      </div>

    </header>

  )
}
