import React from 'react'
import { useNavigate } from 'react-router-dom';
const Singnup = () => {
  const navigate=useNavigate()
const handleSubmit=async(e)=>{
if(e){e.preventDefault();}
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name=e.target.name.value
let url="http://localhost:5000/user";
const options={
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
        name:name,
        email:email,
        password:password,
  })
}
try {
  const response = await fetch(url, options);
  const result = await response.json();
console.log(result)
if(result.success){
  localStorage.setItem('token',result.authtoken);
navigate("/")
}
} catch (error) {
  console.error(error)
}

}
  return (
    <>
    <div className="container my-5">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" aria-describedby="emailHelp" />
    </div>
    {/* email */}
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  </>
  )
}

export default Singnup