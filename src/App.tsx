import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import "nprogress/nprogress.css";
import usePageLoader from "./utils/pageLoader";

const Login = React.lazy(() => import("./pages/auth/Sign_In"));
const Forgot_Password = React.lazy(
  () => import("./pages/auth/Forgot_Password")
);
const Verify_Email = React.lazy(() => import("./pages/auth/Verify_Email"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Tools = React.lazy(() => import("./pages/tools/Manage"));
const Categories = React.lazy(() => import("./pages/categories/Manage"));
const Reviews = React.lazy(() => import("./pages/reviews/Manage"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Admins = React.lazy(() => import("./pages/Admins"));

const View_Tool = React.lazy(() => import("./pages/tools/View"));
const Edit_Tool = React.lazy(() => import("./pages/tools/Edit"));

const View_Review = React.lazy(() => import("./pages/reviews/View"));
const Edit_Review = React.lazy(() => import("./pages/reviews/Edit"));

const View_Category = React.lazy(() => import("./pages/categories/View"));

function App() {
  usePageLoader();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/verify-email" element={<Verify_Email />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admins" element={<Admins />} />

        <Route path="/tool/view/:id" element={<View_Tool />} />
        <Route path="/tool/edit/:id" element={<Edit_Tool />} />

        <Route path="/review/view/:id" element={<View_Review />} />
        <Route path="/review/edit/:id" element={<Edit_Review />} />

        <Route path="/category/view/:id" element={<View_Category />} />
      </Routes>
    </>
  );
}

export default App;
