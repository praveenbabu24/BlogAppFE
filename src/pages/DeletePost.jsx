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
                const res = await axios.get(`http://localhost:5000/api/post/${id}`)
                setposts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getpost()
    },[id])

    const handleDelete = async ()=>{
        try{
            const res = await axios.delete(`http://localhost:5000/api/post/${id}`,{
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
    if(!posts) return <p>Loading......</p>

    return(
        <div>
            <h2>{posts.title}</h2>
            <p>by {posts.author?.username}</p>
            <p>{posts.content}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => {navigate('/home')}}>Home</button>
        </div>
    )

}

export default PostDetail
