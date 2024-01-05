import { useState } from "react"
import axios from 'axios'
import { useEffect } from "react"
import useDebounce from "../../hooks/UseDebounce"
import './search.css'

function Search() {
    const [search,setSearch] = useState('')
    const [avatar_url,setAvatar_Url] = useState('')
    console.log(search)
    // console.log(avatar_url)
    async function getUser(){
        let response;
        if(search){
          response = await axios.get(`https://api.github.com/users/${search}`)
          setAvatar_Url(response.data.avatar_url)
        }  
        console.log('res',response)
    }

    const debounceCallback = useDebounce(((e)=>setSearch(e.target.value)))

    useEffect(()=>{
        getUser()
    },[search])
    return (
        <div className="container">
            <div className="input-div"><input placeholder="enter username" onInput={debounceCallback}/></div>
            <div className="img-div">  <img className="img" src={avatar_url}/></div>  
        </div>
    )
}
export default Search