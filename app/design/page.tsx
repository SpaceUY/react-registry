import { ResourceCard } from "@/components/design/resource-card";

const ICONS = [
  {
    type: "icons",
    name: "pqoqubbw",
    url: "https://icons.pqoqubbw.dev/",
  },
];

const COMPONENTS = [
  {
    type: "components",
    name: "shadcn",
    url: "https://ui.shadcn.com/",
  },
  {
    type: "components",
    name: "21st.dev",
    url: "https://21st.dev/",
  },
  {
    type: "components",
    name: "fancycomponents.dev",
    url: "https://www.fancycomponents.dev/",
  },
  {
    type: "components",
    name: "reactbits.dev",
    url: "https://reactbits.dev/",
  },
];

const REFERENCES = [
  {
    type: "references",
    name: "CSS Gradient",
    url: "https://cssgradient.io/",
  },
];

const KITS = [
  {
    type: "kits",
    name: "tailwindcss",
    url: "https://tailwindcss.com/",
  },
];

const SAAS_TEMPLATES = [
  {
    type: "saas-templates",
    name: "backpine saas-kit",
    url: "https://github.com/backpine/saas-kit",
  },
];

interface ResourceItem {
  type: string;
  name: string;
  url: string;
}

interface CategorySection {
  title: string;
  description: string;
  items: ResourceItem[];
  icon: string;
}

const CATEGORIES: CategorySection[] = [
  {
    title: "Icons",
    description: "Icon libraries and resources for UI design",
    items: ICONS,
    icon: "🎨",
  },
  {
    title: "Components",
    description: "UI component libraries and design systems",
    items: COMPONENTS,
    icon: "🧩",
  },
  {
    title: "References",
    description: "Design tools and reference materials",
    items: REFERENCES,
    icon: "📚",
  },
  {
    title: "Kits",
    description: "CSS frameworks and design kits",
    items: KITS,
    icon: "🛠️",
  },
  {
    title: "SaaS Templates",
    description: "Ready-to-use SaaS application templates",
    items: SAAS_TEMPLATES,
    icon: "🚀",
  },
];

export default function Design() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Design references, components and more
        </h1>
        <p className="text-muted-foreground">
          A collection of design references, components and more.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-12">
        {CATEGORIES.map((category) => (
          <section key={category.title} className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {category.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <ResourceCard
                  key={item.name}
                  item={item}
                  categoryTitle={category.title}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
