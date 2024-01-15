import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { create, productDetails, update } from '../../../Redux/CrudSlice';
import { Link, useParams } from 'react-router-dom';
import { reset_redirectTo } from '../../../Redux/AuthSlice';
import './update.css';
export default function Update() {
    const dispatch = useDispatch()
    const [img, setimg] = useState()
    const { det } = useSelector(state => state.Crud);
    const { id } = useParams()
    console.log(id)
    const [product, setproduct] = useState({
        title: "",
         description: "",
       
    })
    useEffect(() => {
        dispatch(productDetails(id))
    }, [id])
    const [error, seterror] = useState("");
    let name, value;
    const changingData = (e) => {
        name = e.target.name
        value = e.target.value
        if (name === "title") {
            if (value.length === 0) {
                setproduct({ ...product, title: "" });
                seterror({ ...error, title: "title is important" })
            }
            else {
                setproduct({ ...product, title: value });
                seterror({ ...error, title: "" })

            }
        }

        else if (name === "description") {
            if (value.length === 0) {
                setproduct({ ...product, description: "" })
                seterror({ ...error, description: "Description is important" })
            }
            else {
                setproduct({ ...product, description: value })
                seterror({ ...error, description: "" })
            }
        }
    }

    const validation = () => {
        let error = {}
        if (!product.title) {
            error.title = "please write the title"
        }
        if (!product.description) {
            error.des = "please write the description"
        }
        return error
    }

    useEffect(() => {
        if (det !== null) {
            setproduct({
                title: det?.title,
                description: det?.description,
            });
        }
    }, [det]);
    const submit = (e) => {
        e.preventDefault();


        let formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        if (img) {
            formData.append("image", img);
        } else {
            formData.append("image", det.image);
        }
        formData.append("id", id);
        dispatch(update(formData));
    };


    console.log(product)

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
            <form style={{ marginTop: "20px", marginLeft: "10px" }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={changingData}
                        className="form-control"
                        id="exampleInputEmail1"
                    />
                    <span style={{ color: 'red' }}>{error.title}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={changingData}
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                    <span style={{ color: 'red' }}>{error.des}</span>
                </div>  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                        Image
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setimg(e.target.files[0])}
                        name="img"
                        accept="image/*"
                        class="form-control"
                    />

                    {img !== "" && img !== undefined && img !== null ? (
                        <img
                            height="40px"
                            src={URL.createObjectURL(img)}
                            alt=""
                            className="upload-img"
                        />
                    ) : (
                        <>
                            {det?.image !== "" ? (
                                <img
                                    height="70px"
                                    src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${det?.image}`}
                                    alt=""
                                    className="upload-img"
                                />
                            ) : (
                                <img
                                  height="90px"
                                   
                                    alt=""
                                     className="upload-img"
                                />
                            )}
                        </>
                    )}
                    {img === "" && <p>Drag or drop content here</p>}
                </div>


                <button type="submit" onClick={submit} className="btn btn-success">
                    Submit
                </button>

            </form>
            <h5 style={{ fontSize: "16px", margin: "0px 10px" }}>Go to the <Link to="/list">List</Link></h5>
        </>
    )
}

