import {useState} from "react";
import api from "../api/axios";

function Register(){
  const [formData, setFormData] = useState({
    name : "",
    college_name : "",
    email : "",
    paassword : "",
    role : "STUDENT",
  });

  function handleChange(event){
    const {name, value} = event.target;
    setFormData((prev) => ({
      ...prev, 
      [name]:value,
    }))
  }

  async function handleSubmit(event){
    event.preventDefault();

    try{
      const response=await api.post("/register/",formData);
      console.log(response.data);
      alert("Registration successful");
    }catch(error){
      console.log(error.response?.data);
      alert("Registration Failed!");
    }
  }

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}/>
        <input type="text" name="college_name" placeholder="College Name" value={formData.college_name} onChange={handleChange}/>
        <input type="email" name="email" placeholder="College Email" value={formData.email} onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="STUDENT">Student</option>
          <option value="CLUB">Club</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );

}

export default Register;