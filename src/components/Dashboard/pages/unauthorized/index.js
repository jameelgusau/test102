import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack =()=> navigate(-1);
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div  style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    
      }}>
        <h1   style={{fontSize: '4rem', padding: "1rem"}}>Unauthorized</h1>
        <button className="notfound" onClick={goBack}>Go back</button>
      </div>
    </div>
  );
};

export default Unauthorized;
