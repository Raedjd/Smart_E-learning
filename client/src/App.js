import Routers from "./Components/Routers";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
function App() {
  const dispatch = useDispatch();
  const userId = cookie.get("id");

  if (userId) dispatch(getUser());

  return <Routers />;
}

export default App;
