import { useState , useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Home(){
    const [posts,setposts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() =>{
        const fetchPosts = async () =>{
            try{
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post`)
                setposts(res.data)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    const handleLogout = async () =>{
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{},{
                withCredentials:true
            })
            alert(res.data.message)
            navigate('/login')
        }
        catch(err){
                console.log(err)
            }
    }

    return(
        <div className="min-h-screen bg-[#0F0F12]">
            <div className="border-b border-[#2A2A33] px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#E4E4E7]">Blog Posts</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/create')}
                        className="bg-[#6366F1] hover:bg-[#818CF8] text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                    >
                        Create new post
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-transparent border border-[#2A2A33] hover:border-[#EF4444] hover:text-[#EF4444] text-[#9999A3] font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {loading ? (
                    <p className="text-[#9999A3] text-center">Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p className="text-[#9999A3] text-center">No posts yet. Be the first to write one.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) =>(
                            <div
                                key={post._id}
                                onClick={() => navigate(`/post/${post._id}`)}
                                className="bg-[#1C1C23] border border-[#2A2A33] hover:border-[#6366F1] rounded-xl p-5 cursor-pointer transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-[#E4E4E7] mb-2">{post.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-[#9999A3]">
                                    <span>{post.author.username}</span>
                                    <span>·</span>
                                    <span>{post.createAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home