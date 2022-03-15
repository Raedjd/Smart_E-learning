import { useEffect, useState } from "react";
import { UserIdContext } from "./Components/Pages/User/AppContext";
import Routers from "./Components/Routers";
import axios from "axios";
function App() {
  const [userId, setUserId] = useState(null);

  useEffect(async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setUserId(res.data);
      })
      .catch((err) => console.log("No token exist"));
  }, [userId]);
  return (
    <div className="App">
      <UserIdContext.Provider value={userId}>
        <Routers />
      </UserIdContext.Provider>
    </div>
  );
}

export default App;
