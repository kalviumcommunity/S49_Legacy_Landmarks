import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function UserData() {

  let [data, setData] = useState()

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:3000/placeData')
        setData(response.data)
        console.log(response.data)
      }catch (err){
        console.log("Error")
    }
    }
    fetchData()
  },[])

  const handleDelete = async(id) => {
    try{
      window.confirm('Are you sure you want to delete this entity?') 
      axios.delete(`http://localhost:3000/placeData/${id}`)
      setData(data.filter((item)=> item._id  !== id))
    }catch(error){
      console.error(error)
    };
}

  return (
    <div>
      <div>{data && data.map((item)=>{
            return(
                <div key={item._id}>
                  <Link to="/" className='home-btn'>Home</Link>
                    <h1>{item.placeName}</h1>
                    <p>{item.location}</p>
                    <p>{item.yearBuilt}</p>
                    <p>{item.architect}</p>
                    <p>{item.architecturalStyle}</p>
                    <p>{item.historicalSignificance}</p>
                    <p>{item.currentUse}</p>
                    <Link to={`/update/${item._id}`}><button>Edit</button></Link>
                    <button onClick={()=> handleDelete(item._id)}>Delete</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}
