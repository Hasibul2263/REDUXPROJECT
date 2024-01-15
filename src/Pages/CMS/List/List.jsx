

import React from 'react'
import SweetAlertComponent from '../../../SweetAlert/SweetAlert';
import { list, remove } from '../../../Redux/CrudSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reset_redirectTo } from '../../../Redux/AuthSlice';
import { productu } from '../../../Redux/Helper';
import './list.css';



export default function List() {

  const dispatch = useDispatch()
  const [delete_id, setDelete_id] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const { listData, totalRecords } = useSelector(state => state.Crud);
  const { redirectTo } = useSelector(state => state.Auth)
  useEffect(() => {
    dispatch(list())
  }, [])
  const delete_func = (id) => {
    if (delete_id !== "") {
      dispatch(remove({ id: delete_id })).then(() => {
        dispatch(list());
      });
    }
    setDelete_id("");
    setIsDelete(false);
  };

  useEffect(() => {
    dispatch(reset_redirectTo(null))
  }, [redirectTo]);

  return (
    <div className='container-fluid'>
      <section id="breadcrumbs" className="breadcrumbs ">
        <div class="container">

          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2>About</h2>

            </div>

            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/list">Product List</Link></li>
            </ol>
          </div>

        </div>
      </section>
      <div className='row listContainer'>




        <div className="">
          <table className="table listTable">
            <thead>
              <tr className='w-75 p-3'>

                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((i) => (
                totalRecords >= 1 ? (
                  <tr key={i._id} className='w-75 p-3' >

                    <td><img src={productu(i.image)} /></td>
                    <td>{i.title}</td>
                    <td>{i.description}</td>

                    <td >
                      <Link style={{ marginRight: "5px" }}
                        to={`/update/${i._id}`}

                        className="btn btn-success"
                      >
                        Update
                      </Link>

                      <Link
                        to="#"
                        onClick={() => {
                          setDelete_id(i._id);
                          setIsDelete(true);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ) : (
                  <tr key={i._id}>
                    <td colSpan="4">NO DATA FOUND</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>




      </div>
      <br />
      <div className='text-center background-transparent'>
        <Link to="/product" ><button style={{ border: "none", textAlign: "center", color: "brown", fontSize: "18px", fontWeight: "bold", borderRadius:"5px", background:"transparent",  }} >
          Create A new Product</button></Link>
      </div>


      {isDelete && (
        <SweetAlertComponent
          confirm={delete_func}
          cancle={() => setIsDelete(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}
      '
    </div>
  )
}
