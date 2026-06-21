import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetail(){
    const [posts,setposts] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        const getpost = async () => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${id}`)
                setposts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getpost()
    },[id])

    const handleDelete = async ()=>{
        const confirmed = window.confirm("Delete this post? This can't be undone.")
        if(!confirmed) return
        try{
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${id}`,{
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
    if(!posts) return (
        <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center">
            <p className="text-[#9999A3]">Loading......</p>
        </div>
    )

    return(
        <div className="min-h-screen bg-[#0F0F12] px-6 py-10">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/home')}
                    className="text-[#9999A3] hover:text-[#E4E4E7] text-sm mb-6 transition-colors"
                >
                    ← Back to all posts
                </button>

                <div className="bg-[#1C1C23] border border-[#2A2A33] rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-[#E4E4E7] mb-2">{posts.title}</h2>
                    <p className="text-sm text-[#9999A3] mb-6">by {posts.author?.username}</p>
                    <p className="text-[#E4E4E7] leading-relaxed whitespace-pre-wrap mb-8">{posts.content}</p>

                    <div className="flex gap-3 pt-6 border-t border-[#2A2A33]">
                        <button
                            onClick={handleDelete}
                            className="bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {navigate('/home')}}
                            className="bg-transparent border border-[#2A2A33] text-[#9999A3] hover:text-[#E4E4E7] hover:border-[#6366F1] font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail