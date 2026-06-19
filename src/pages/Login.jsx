import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Register(){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email:'',
        password:''
    })
    const handlechange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    const handlesubmit = async () => {
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login',form,
                {withCredentials :true}
            )
            alert(res.data.message)
            navigate('/home')
        }
        catch(err){
            console.log(err)
            alert("error")
        }
    }
    return(
        <div>
            <h2>
                LOGIN
            </h2>
            <input type="email" name="email" id="email" placeholder="Email" value={form.email} onChange={handlechange} />
            <input type="password" name="password" id="password" placeholder="Password" value={form.password} onChange={handlechange}/>
            <button type="button" onClick={handlesubmit}>Register</button>
        </div>
    )

}

export default Register
