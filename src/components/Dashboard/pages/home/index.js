import React
// , { useRef } 
from "react";
// import { useSelector} from "react-redux";
// import useRefreshToken from "../../../../hooks/useRefreshToken";
// import { APIS, request } from "../../../../_services";
// import useAxiosPrevate from "../../../../hooks/useAxiosPrevate";

const Home = () => {
  // const user = useSelector((state) => state.userProfile.value);
  // const ref = useRef()
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

  // const handleSubmit= async(e)=>{
  //   e.preventDefault();
  //   // console.log(ref.current.files)
  //   const files = ref.current.files
  //   const formData = new FormData();
  //   Object.keys(files).forEach(key =>{
  //     formData.append(files.item(key).name, files.item(key))});
  //   // console.log(formData)
  //   const response = await fetch('http://localhost:4000/api/upload', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${user.jwtToken}`
  //     },
  //     body: formData
  //   })
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <>
      <div className="main-header">
        <div className="main-header__heading">Hello User</div>
        <div className="main-header__updates">Recent Items</div>
      </div>

      <div className="main-overview">
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">
            {/* <form onSubmit={handleSubmit}>
              <input type="file"  name="image" ref={ref} multiple accept="image/*" />
              <button type="submit">Submit</button>
            </form> */}
          </div>
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
