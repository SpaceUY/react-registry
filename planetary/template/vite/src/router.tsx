import React from "react";
import {
	createBrowserRouter,
	RouteObject,
	ScrollRestoration,
} from "react-router-dom";

import homeRoutes from "./modules/home/router";
import NotFound from "./common/views/not-found";
import RouteError from "./common/components/error-boundary/route-error";

//Add scroll repositioning to all the routes
const addscrollRestoration = (routes: RouteObject[]): RouteObject[] => {
	return routes.map((route) => {
		const wrappedElement = route.element ? (
			<React.Fragment>
				{route.element}
				<ScrollRestoration />
			</React.Fragment>
		) : (
			route.element
		);

		return {
			...route,
			element: wrappedElement,
		};
	});
};

// Add error elements to routes based on their type
const addErrorElements = (
	routes: RouteObject[],
	isAuthRoute: boolean
): RouteObject[] => {
	return routes.map((route) => ({
		...route,
		errorElement: isAuthRoute ? (
			<div>AuthLayoutErrorElement</div>
			// <AuthLayoutErrorElement />
		) : (
			<div>LoginLayoutErrorElement</div>
			// <LoginLayoutErrorElement />
		),
	}));
};

//first apply scroll restoration to all routes
const authRoutesWithScroll = addscrollRestoration([
  ...homeRoutes,
]);

// then, apply to all routes the error elements
const authRoutesWithError = addErrorElements(authRoutesWithScroll, true);

// const nonAuthRoutesWithError = addErrorElements([...loginRoutes], false);

// Combine all routes
const routes: RouteObject[] = [
	...authRoutesWithError,
	// ...nonAuthRoutesWithError,
	{
		path: "*",
		element: <NotFound />,
		errorElement: <RouteError />,
	},
];

const router = createBrowserRouter(routes);

export default router;
