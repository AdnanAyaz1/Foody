import { ROUTES } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={ROUTES.sign_in} />;

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ headerShown: false }}
    ></Tabs>
  );
};

export default Layout;
