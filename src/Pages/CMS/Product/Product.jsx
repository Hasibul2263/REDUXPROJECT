import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { create } from '../../../Redux/CrudSlice';
import { Link } from 'react-router-dom';
import { reset_redirectTo } from '../../../Redux/AuthSlice';
export default function Product() {
    const dispatch=useDispatch()
    const [img, setimg] = useState()
    const [product,setproduct]=useState({
        title:"",
        des:"",
    })
    const [error,seterror]=useState("");
    let name,value;
    const changingData=(e)=>{
       name=e.target.name 
       value=e.target.value 
       if(name==="title"){
         if(value.length===0){
            setproduct({...product, title:"" });
            seterror({...error,title:"title is important"})
         }
         else{
            setproduct({...product, title:value});
            seterror({...error,title:""})

         }
       }
      
       else if(name==="description"){
        if(value.length===0){
          setproduct({...product,des:""})
          seterror({...error,des:"Description is important"})
        }
        else{
            setproduct({...product,des:value})
            seterror({...error,des:""})
        }
       }
    }
   
    const validation=()=>{
       let error={}
        if(!product.title){
            error.title="please write the title"
        }
        if(!product.des){
            error.des="please write the description"
        }
        return error
    }
    const submit=(e)=>{
        e.preventDefault();
         setproduct(product);
        seterror(validation)
        const formData=new FormData()
        formData.append("title",product.title);
        formData.append("description",product.des);
         formData.append("image",img)
        dispatch(create(formData));
    }
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
    <form style={{marginTop:"20px",marginLeft:"10px"}}>
          <div className="mb-3 w-6/12">
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
              value={product.des}
              onChange={changingData}
              className="form-control"
              id="exampleInputPassword1"
            />
            <span style={{ color: 'red' }}>{error.des}</span>
          </div>
          <div>
          <input
            type="file"
            onChange={(e) => setimg(e.target.files[0])}
            name="img"
            accept="image/*"
            class="form-control"
          />
          {img !== "" && img !== undefined && img !== null ? (
            <img
              style={{ height: "180px" }}
              src={URL.createObjectURL(img)}
              alt=""
              className="upload-img"
            />
          ) : (
            <>{img === "" && <p>Drag or drop content here</p>}</>
          )}
        </div>

        <br />
          <br/>

          <button type="submit" onClick={submit} className="btn btn-success">
            Submit
          </button>

        </form>
        <h5 style={{fontSize:"16px",margin:"0px 10px"}}>Go to the <Link to="/list">List</Link></h5>
    </>
  )
}

