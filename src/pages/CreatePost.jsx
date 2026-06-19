import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function CreatePost(){
    const [form, setForm] = useState({
        title:'',
        content:''
    })
    const navigate = useNavigate()
    
    const handlechange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }

    const handlesubmit = async () => {
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
    }

    return(
        <div>
            <h2>
                Create post
            </h2>
            <input type="text" name="title" id="title" placeholder="title" value={form.title} onChange={handlechange} />
            <textarea name="content" id="content" placeholder="content" value={form.content} onChange={handlechange}></textarea>
            <button type="button" onClick={handlesubmit}>post</button>
        </div>
    )
}

export default CreatePost