import React from 'react';
import Axios from 'axios';

export default function AbsenceManager() {
    
 
    Axios.get("http://localhost:4000/members")
    .then(response => console.log(response.data))
    .catch((err) => console.log(err));
 
    Axios.get("http://localhost:4000/absences")
        .then(response => console.log(response.data))
        .catch((err) => console.log(err));
    

    return(
        <div>
           
        </div>
    )

}