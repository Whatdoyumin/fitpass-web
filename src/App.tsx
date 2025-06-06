import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}

export default App;
