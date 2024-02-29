import React from "react";
import data from  "./dummyData.json"

function Data(){
    return(
        <div>{data && data.map((item)=>{
            return(
                <div key={item.id}>
                    <h1>{item.placeName}</h1>
                    <p>{item.location}</p>
                    <p>{item.yearBuilt}</p>
                    <p>{item.architect}</p>
                    <p>{item.architecturalStyle}</p>
                    <p>{item.historicalSignificance}</p>
                    <p>{item.currentUse}</p>
                </div>
            )
        })}</div>
    )
}

export default Data