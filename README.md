# registry-template

You can use the `shadcn` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any React project.

> [!IMPORTANT]  
> To install any component run the following command

```zsh
npx shadcn@latest add https://spaceuy.github.io/react-registry/r/hello-world.json
```

## Getting Started

This is a template for creating a custom registry using Next.js.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item are compatible with the `shadcn` CLI.
- We have also added v0 integration using the `Open in v0` api.

## Add a component to the registry:

### 1. Clone the repository:

```bash
git clone https://github.com/SpaceUY/react-registry
```

### 2. Inside the `registry/newyork` folder you will find the following directories:

* **blocks**: contains the code blocks and the logic behind the components.
* **ui**: contains the shadcn/ui components.

The idea is that **blocks** should use components from **shadcn/ui**.

Inside the **blocks** folder, you can add your components along with their logic, data fetching, libraries, etc.
It is important that within this folder there is always a `page.tsx` file, which will be the main component to be rendered.

**Example**: Let’s say we want to upload a component that implements an infinite virtualized scroll. Once we clone the repository, we create a new folder inside **blocks** with the following structure:

```bash
virtualized-infinite-scroll/
├── components/
│   └── InfiniteTable.tsx
├── hooks/
│   └── use-virtualized-infinite-scroll.ts
├── lib/
│   ├── user.ts
│   └── utils.ts
├── types/
│   ├── user.types.ts
└── page.tsx
```

### 3. Update the `registry.json` file by adding the new component, its characteristics, and dependencies.

In the previous example, the `registry.json` file would look like this:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "tatulino",
  "homepage": "https://spaceuy.github.io/react-registry",
  "items": [
    //... many other components in the registry...
    {
      "name": "virtualized-infinite-scroll",
      "type": "registry:complex-component",
      "description": "A hook that combines TanStack Query's infinite queries with TanStack Virtual for efficient virtualized infinite scrolling. Implemented with shadcn table to show how it works.",
      "dependencies": ["@tanstack/react-query", "@tanstack/react-virtual", "react"],
      "files": [
        {
          "path": "registry/new-york/blocks/use-virtualized-infinite-scroll/page.tsx",
          "type": "registry:hook"
        }
      ]
    }
  ]
}
```

*Important Note*: In the `"files" -> "path"` field, make sure to set the path of the `page.tsx` file of the component.

### 4. Create a pull request to the `main` branch of the `react-registry` repository so the registry gets updated.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.
