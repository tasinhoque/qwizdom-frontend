import React from 'react';
import api from '../api';

export default function Dashboard() {

  function apiCheck(){

    api.getThreadComments()
    .then(
      res=>
      {
        console.log(res);
      }
    )
    .catch(
      error=>{
        console.log(error.response);
      }
    )
  }
  
  return (
    <div>

      <p> this is dashboard </p>
        <button onClick={apiCheck}>
             Api checker
       </button>
    </div>

  );
}
