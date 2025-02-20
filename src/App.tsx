import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    let adminElement = document.getElementById("admin");

    if (!adminElement) {
      adminElement = document.createElement("div");
      adminElement.id = "admin";
      document.body.prepend(adminElement);
    }

    if (adminElement.childElementCount === 0) {
      adminElement.remove();
    }
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}

export default App;
