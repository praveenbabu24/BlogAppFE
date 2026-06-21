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
    const [loading, setLoading] = useState(false)

    const handlechange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    const handlesubmit = async () => {
        setLoading(true)
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
        finally{
            setLoading(false)
        }
    }
    return(
        <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1C1C23] border border-[#2A2A33] rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-[#E4E4E7] text-center mb-1">
                    Create an account
                </h2>
                <p className="text-[#9999A3] text-sm text-center mb-6">
                    Sign up to get started
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handlechange}
                        className="w-full bg-[#0F0F12] border border-[#2A2A33] rounded-lg px-4 py-3 text-[#E4E4E7] placeholder-[#9999A3] outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handlechange}
                        className="w-full bg-[#0F0F12] border border-[#2A2A33] rounded-lg px-4 py-3 text-[#E4E4E7] placeholder-[#9999A3] outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handlechange}
                        className="w-full bg-[#0F0F12] border border-[#2A2A33] rounded-lg px-4 py-3 text-[#E4E4E7] placeholder-[#9999A3] outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                    />
                    <button
                        type="button"
                        onClick={handlesubmit}
                        disabled={loading}
                        className="w-full bg-[#6366F1] hover:bg-[#818CF8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg py-3 transition-colors"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </div>

                <p className="text-[#9999A3] text-sm text-center mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#6366F1] hover:text-[#818CF8] font-medium">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Register