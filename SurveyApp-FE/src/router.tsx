import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signin from "./component/signin";
import Dashboard from "./component/dashboard";
import Signup from "./component/signup";
import PrivateRoute from "./components/PrivateRoute";
import SurveyPage from "./component/surveyPage";

export const router = createBrowserRouter([{path:"/", element: <App />},
    {path:"/signin", element: <Signin />},
    {path:"/signup", element: <Signup/>},
    {path:"/dashboard", element:( <PrivateRoute><Dashboard/></PrivateRoute>)},
    {path:"/survey", element:( <PrivateRoute><SurveyPage/></PrivateRoute>)}
])