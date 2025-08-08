const fs = require("fs");
const path = require("path");

// Constants that can be reused
const CONSTANTS = {
  REGISTRY_NAME: "tatulino",
  HOMEPAGE: "https://registry.tatulino.com",
  REGISTRY_URL: "https://registry.tatulino.com/r",
  TEMPLATE_BASE_PATH: "planetary/template/vite",
  STATE_MANAGEMENT_PATH: "planetary/state-management",
  AUTHOR: "Jona630 https://github.com/Jona630",
};

// Template for registry items
const createRegistryItem = (name, type, title, description, options = {}) => ({
  name,
  type,
  title,
  description,
  author: options.author || CONSTANTS.AUTHOR,
  dependencies: options.dependencies || [],
  registryDependencies: options.registryDependencies || [],
  files: options.files || [],
});

// Generate the registry (definition only)
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: CONSTANTS.REGISTRY_NAME,
  homepage: CONSTANTS.HOMEPAGE,
  items: [
    // Your existing items with constants
    createRegistryItem(
      "vite-template-docs",
      "registry:block",
      "Vite Template Docs",
      "Docs for the Vite Template",
      {
        files: [
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/README.md`,
            type: "registry:file",
            target: "docs/template/README-template-vite.md",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/docs/README.md`,
            type: "registry:file",
            target: "docs/template/README.md",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/docs/project-structure.md`,
            type: "registry:file",
            target: "docs/template/project-structure.md",
          },
        ],
      }
    ),

    createRegistryItem(
      "posthog",
      "registry:block",
      "Posthog analytics",
      "Posthog analytics",
      {
        dependencies: ["posthog-js"],
        files: [
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/lib/posthog.tsx`,
            type: "registry:lib",
            target: "src/common/lib/posthog.ts",
          },
        ],
      }
    ),

    createRegistryItem("zustand", "registry:block", "Zustand", "Zustand", {
      dependencies: ["zustand"],
      files: [
        {
          path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/store/use-store.ts`,
          type: "registry:hook",
          target: "src/common/stores/use-store.ts",
        },
        {
          path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/store/use-persist-store.ts`,
          type: "registry:hook",
          target: "src/common/stores/use-persist-store.ts",
        },
        {
          path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/store/README.md`,
          type: "registry:file",
          target: "docs/zustand/README.md",
        },
      ],
    }),

    createRegistryItem(
      "environment",
      "registry:block",
      "Environment Configuration",
      "Set up env vars using zod",
      {
        dependencies: ["zod"],
        files: [
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/environment.ts`,
            type: "registry:file",
            target: "src/common/utils/environment.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/env.example`,
            type: "registry:file",
            target: ".env.example",
          },
        ],
      }
    ),

    createRegistryItem("logger", "registry:block", "Logger", "Logger", {
      files: [
        {
          path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/logger.ts`,
          type: "registry:file",
          target: "src/common/utils/logger.ts",
        },
      ],
    }),

    createRegistryItem(
      "vite-template",
      "registry:block",
      "Vite Template",
      "A template for a Vite project.",
      {
        registryDependencies: [
          `${CONSTANTS.REGISTRY_URL}/vite-template-docs.json`,
          `${CONSTANTS.REGISTRY_URL}/posthog.json`,
          `${CONSTANTS.REGISTRY_URL}/zustand.json`,
          `${CONSTANTS.REGISTRY_URL}/environment.json`,
          `${CONSTANTS.REGISTRY_URL}/logger.json`,
        ],
        files: [
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/main.tsx`,
            type: "registry:file",
            target: "src/main-template.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/router.tsx`,
            type: "registry:file",
            target: "src/router.tsx",
          },
          // Components
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/components/error-boundary/auth-layout-with-error.tsx`,
            type: "registry:file",
            target:
              "src/common/components/error-boundary/auth-layout-with-error.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/components/error-boundary/login-layout-with-error.tsx`,
            type: "registry:file",
            target:
              "src/common/components/error-boundary/login-layout-with-error.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/components/error-boundary/route-error.tsx`,
            type: "registry:file",
            target: "src/common/components/error-boundary/route-error.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/components/theme-provider.tsx`,
            type: "registry:file",
            target: "src/common/components/theme-provider.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/components/theme-toggle.tsx`,
            type: "registry:file",
            target: "src/common/components/theme-toggle.tsx",
          },
          // Layouts
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/layouts/auth-layout.tsx`,
            type: "registry:file",
            target: "src/common/layouts/auth-layout.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/layouts/layout.tsx`,
            type: "registry:file",
            target: "src/common/layouts/layout.tsx",
          },
          // Lib
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/lib/utils.ts`,
            type: "registry:file",
            target: "src/common/lib/utils.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/lib/services/query.interceptor.ts`,
            type: "registry:file",
            target: "src/common/lib/services/query.interceptor.ts",
          },
          // Types
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/types/routes.ts`,
            type: "registry:file",
            target: "src/common/types/routes.ts",
          },
          // Utils
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/api-error.ts`,
            type: "registry:file",
            target: "src/common/utils/api-error.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/constants.ts`,
            type: "registry:file",
            target: "src/common/utils/constants.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/date.ts`,
            type: "registry:file",
            target: "src/common/utils/date.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/debounce.ts`,
            type: "registry:file",
            target: "src/common/utils/debounce.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/logger.ts`,
            type: "registry:file",
            target: "src/common/utils/logger.ts",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/utils/wallet.ts`,
            type: "registry:file",
            target: "src/common/utils/wallet.ts",
          },
          // Hooks
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/hooks/use-mobile.tsx`,
            type: "registry:hook",
            target: "src/common/hooks/use-mobile.tsx",
          },
          // Views
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/common/views/not-found.tsx`,
            type: "registry:component",
            target: "src/common/views/not-found.tsx",
          },
          // Modules
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/modules/home/router.tsx`,
            type: "registry:file",
            target: "src/modules/home/router.tsx",
          },
          {
            path: `${CONSTANTS.TEMPLATE_BASE_PATH}/src/modules/home/views/home.tsx`,
            type: "registry:component",
            target: "src/modules/home/views/home.tsx",
          },
        ],
      }
    ),
  ],
};

// ----------
// Emit a CLI-friendly file to paste into registry.json
// ----------

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

try {
  const cliOutPath = path.join(__dirname, "../registry-cli.json");
  writeJson(cliOutPath, { items: registry.items });
  console.log(
    "✅ registry-cli.json generated. Copy its items into registry.json"
  );
} catch (err) {
  console.error("❌ Failed to generate registry-cli.json:", err);
  process.exit(1);
}
