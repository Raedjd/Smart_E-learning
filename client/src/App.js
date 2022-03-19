import { useEffect, useState } from "react";
import Routers from "./Components/Routers";
import axios from "axios";
import { UserIdContext } from "./Components/Pages/User/AppContext";
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
        localStorage.setItem(userId, res.data);
      })
      .catch((err) => console.log("No token exist"));
  }, [userId]);

  return (
    <UserIdContext.Provider value={userId}>
      <Routers />
    </UserIdContext.Provider>
  );
}

export default App;
