import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

export default function OnlyAdminPrivateRoute() {
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser.findUser) {
    currentUser = currentUser.findUser;
  }
  if (currentUser) {
    return currentUser.isAdmin ? <Outlet /> : <Navigate to="/signin" />;
  } else {
    return <Navigate to="/signin" />;
  }
}
