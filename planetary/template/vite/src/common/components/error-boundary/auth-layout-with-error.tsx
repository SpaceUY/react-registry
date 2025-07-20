import AuthLayout from "../../layouts/auth-layout";
import RouteError from "./route-error";

/**
 * Error element that preserves the auth layout
 */
export function AuthLayoutErrorElement() {
  return (
    <AuthLayout>
      <RouteError />
    </AuthLayout>
  );
}
