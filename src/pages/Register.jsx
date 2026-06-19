import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Register(){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:''
    })
    const handlechange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    const handlesubmit = async () => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,form)
            alert(res.data.message)
            setForm({username:'',password:'',email:''})
            navigate('/login')
        }
        catch(err){
            console.log(err)
            alert("error")
        }
    }
    return(
        <div>
            <h2>
                Register
            </h2>
            <input type="text" name="username" id="username" placeholder="Uname" value={form.username} onChange={handlechange}/>
            <input type="email" name="email" id="email" placeholder="Email" value={form.email} onChange={handlechange} />
            <input type="password" name="password" id="password" placeholder="Password" value={form.password} onChange={handlechange}/>
            <button type="button" onClick={handlesubmit}>Register</button>
        </div>
    )

}

export default Register