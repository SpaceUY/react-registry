import Layout from "../../layouts/layout";
import RouteError from "./route-error";

/**
 * Error element that preserves the login layout
 */
export function LoginLayoutErrorElement() {
	return (
		<Layout>
			<RouteError />
		</Layout>
	);
}
