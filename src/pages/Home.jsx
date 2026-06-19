import { useState , useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Home(){
    const [posts,setposts] = useState([])
    const navigate = useNavigate()
    useEffect(() =>{
        const fetchPosts = async () =>{
            try{
                const res = await axios.get('http://localhost:5000/api/post')
                setposts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchPosts()
    }, [])

    const handleLogout = async () =>{
        try{
            const res = await axios.post('http://localhost:5000/api/auth/logout',{},{
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
        <div>
            <h1>blog posts</h1>
            <button onClick={() => navigate('/create')}>create new post</button>
            {
                posts.map((post) =>(
                    <div key={post._id} onClick={() => navigate(`/post/${post._id}`)}>
                        <h3>{post.title}</h3>
                        <p>{post.author.username}</p>
                        <p>{post.createAt}</p>
                    </div>
                ))
            }
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Home