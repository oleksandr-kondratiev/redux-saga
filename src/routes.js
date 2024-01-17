import React from "react";
import { Route, Switch } from "react-router-dom";

// pages
import { App } from "./pages/App";
import { Details } from "./pages/Details";

export const MAIN_ROUTE = "MAIN_ROUTE";
export const PEOPLE_ROUTE = "PEOPLE_DETAILS_ROUTE";

export const routes = [
  { id: MAIN_ROUTE, path: "/", exact: true, component: App },
  { id: PEOPLE_ROUTE, path: "/people/:id", exact: true, component: Details },
];

export const getRouteConfig = (id) => {
  const currentRoute = routes.find((route) => route.id === id);

  if (currentRoute) {
    const { component: _component, ...rest } = currentRoute;

    return rest;
  }
};

export const Routes = () => {
  const renderRoute = ({ id, ...props }) => <Route key={id} {...props} />;

  return <Switch>{routes.map(renderRoute)}</Switch>;
};
