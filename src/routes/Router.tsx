import { createBrowserRouter } from "react-router-dom";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import ownerRoutes from "./ownerRoutes";

const Router = createBrowserRouter([userRoutes, adminRoutes, ownerRoutes]);

export default Router;
