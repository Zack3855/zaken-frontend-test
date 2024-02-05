import { Slide, ToastContainer } from "react-toastify";
import RoutesWrapper from "./routes/RoutesWrapper.tsx";
import { AuthContextProvider } from "./context/authContext/AuthContext.tsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContextProvider>
      <RoutesWrapper />
      <ToastContainer position="bottom-right" transition={Slide} limit={2} />
    </AuthContextProvider>
  );
}

export default App;
