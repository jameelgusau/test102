import React from "react";
// import useRefreshToken from "../../../../hooks/useRefreshToken";
// import { APIS, request } from "../../../../_services";
// import useAxiosPrevate from "../../../../hooks/useAxiosPrevate";

const Home = () => {
  // const refresh = useRefreshToken();
//   const axiosPrivate = useAxiosPrevate();

//   useEffect(() => {
//     let isMounted  = true;
//     const controller =  new AbortController();
//     const getAgents =  async () =>{
//       try{
//         const response = await axiosPrivate.get('/api/agentList', {
//           signal: controller.signal
//         });
//         console.log(response.data, "axios")
//         console.log(isMounted)
//       }catch(err){

//       }
//     }
//     getAgents()
//     return ()=>{
//       isMounted = false
//       controller.abort()
//     }
//   });

  return (
    <>
      <div className="main-header">
        <div className="main-header__heading">Hello User</div>
        <div className="main-header__updates">Recent Items</div>
      </div>

      <div className="main-overview">
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">refresh</div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
      </div>

      <div className="main-cards">
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
      </div>
    </>
  );
};

export default Home;
