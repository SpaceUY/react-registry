import React from "react";
import { JSX } from "react/jsx-runtime";
// import AuthLayout from "../components/auth-layout";
// import Layout from "@/modules/login/layout";
import { NavLink } from "react-router-dom";
import { Routes } from "../types/routes";

// mock
const getUser = () => {
  return {
    id: "1",
    email: "test@test.com",
    username: "test",
    token: "1234567890",
  };
};

const NotFound: React.FC = () => {
  const isAuthenticated = getUser().email !== "" && getUser().token !== "";

  const renderLayout = (children: JSX.Element) => {
    return isAuthenticated ? (
      <>
        {/* <AuthLayout> */}
        {children}
        {/* </AuthLayout> */}
      </>
    ) : (
      <>
        {/* <Layout> */}
        {children}
        {/* </Layout> */}
      </>
    );
  };

  return renderLayout(
    <div className="flex flex-col w-full h-full gap-y-4 md:gap-y-12 justify-start items-center text-center md:items-start md:text-left">
      <div className="flex flex-col md:flex-row md:w-full gap-x-8 md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center relative md:justify-start justify-center">
            <NavLink
              to={isAuthenticated ? Routes.Dashboard : Routes.Landing}
              className="absolute left-0 md:static md:mr-4"
            />
            <p className="text-2xl uppercase">Oops</p>
          </div>

          <p className="font-bold text-lg">
            The page you are looking for doesn't exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
