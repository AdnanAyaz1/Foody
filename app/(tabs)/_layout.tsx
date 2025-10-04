import { ROUTES } from "@/constants";
import { router, Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    router.replace(ROUTES.sign_up);
  }
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ headerShown: false }}
    ></Tabs>
  );
};

export default Layout;
