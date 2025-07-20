import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { env } from "../../../environment";

// mock
const getUser = () => {
  return {
    id: "1",
    email: "test@test.com",
    username: "test",
    token: "1234567890",
  };
};

export default function RouteError() {
  const error = useRouteError();
  const user = getUser();
  const isLoggedIn = user.email !== "" && user.token !== "";
  const isDevelopment =
    env.NODE_ENV === "development" || window.location.hostname === "localhost";

  // Extract error message
  let errorMessage = "An unexpected error occurred";
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = "Application Error";
    errorDetails = error.statusText || error.data?.message || "Unknown error";
  } else if (error instanceof Error) {
    errorMessage = "Something went wrong";
    errorDetails = error.message;

    // Log to Sentry or any other provider
    // Sentry.captureException(error, {
    //   tags: {
    //     component: "RouteError",
    //   },
    //   user: isLoggedIn
    //     ? {
    //         id: user.id || undefined,
    //         email: user.email || undefined,
    //         username: user.username || undefined,
    //       }
    //     : undefined,
    // });
  } else if (typeof error === "string") {
    errorMessage = "Error";
    errorDetails = error;

    // Log to Sentry or any other provider
    // Sentry.captureMessage(error, {
    //   level: "error",
    //   tags: {
    //     component: "RouteError",
    //   },
    // });
  } else {
    // Log unknown error to Sentry or any other provider
    // Sentry.captureMessage("Unknown error in RouteError component", {
    //   level: "error",
    //   extra: { error },
    // });
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      {/* <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">{errorMessage}</CardTitle>
          <CardDescription>
            We're sorry, but an error occurred while loading this page.
          </CardDescription>
        </CardHeader>
        {!isDevelopment && (
          <CardContent>
            <div className="p-4 my-2 overflow-auto text-sm bg-muted rounded-md max-h-40">
              {errorDetails}
            </div>
          </CardContent>
        )}
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button
            onClick={() => (window.location.href = isLoggedIn ? "/home" : "/")}
          >
            Go to {isLoggedIn ? "Home" : "Landing"}
          </Button>
        </CardFooter>
      </Card> */}
    </div>
  );
}
