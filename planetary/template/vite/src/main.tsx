import { PostHogProvider } from "posthog-js/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { envVars } from "./environment";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={envVars.POSTHOG_API_KEY}
      options={{
        api_host: envVars.POSTHOG_HOST,
        defaults: "2025-05-24",
        capture_exceptions: true,
        debug: envVars.NODE_ENV === "development",
      }}
    >
      <div>Your App Here</div>
    </PostHogProvider>
  </StrictMode>
);
