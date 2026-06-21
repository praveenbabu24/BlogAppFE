import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function CreatePost(){
    const [form, setForm] = useState({
        title:'',
        content:''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const handlechange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }

    const handlesubmit = async () => {
        setLoading(true)
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/createPost`,form ,{
                withCredentials:true
            })
            alert(res.data.message)
            navigate('/home')
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
        <div className="min-h-screen bg-[#0F0F12] px-6 py-10">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-[#E4E4E7] mb-6">
                    Create post
                </h2>

                <div className="bg-[#1C1C23] border border-[#2A2A33] rounded-2xl p-8 space-y-4">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handlechange}
                        className="w-full bg-[#0F0F12] border border-[#2A2A33] rounded-lg px-4 py-3 text-[#E4E4E7] placeholder-[#9999A3] outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                    />
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Write your post..."
                        value={form.content}
                        onChange={handlechange}
                        rows={10}
                        className="w-full bg-[#0F0F12] border border-[#2A2A33] rounded-lg px-4 py-3 text-[#E4E4E7] placeholder-[#9999A3] outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors resize-none leading-relaxed"
                    ></textarea>
                    <button
                        type="button"
                        onClick={handlesubmit}
                        disabled={loading}
                        className="bg-[#6366F1] hover:bg-[#818CF8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-6 py-3 transition-colors"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost