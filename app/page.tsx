import { ExampleSection } from "@/components/example-section";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import FormCompletePage from "@/registry/new-york/blocks/form-complete/page";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <ExampleSection
          title="A simple hello world component"
          name="hello-world"
        >
          <HelloWorld />
        </ExampleSection>

        <ExampleSection
          title="A contact form with Zod validation"
          name="example-form"
        >
          <ExampleForm />
        </ExampleSection>

        <ExampleSection
          title="A complex component showing hooks, libs and components"
          name="complex-component"
        >
          <PokemonPage />
        </ExampleSection>

        <ExampleSection
          title="A login form with a CSS file"
          name="example-with-css"
        >
          <ExampleCard />
        </ExampleSection>

        <ExampleSection
          title="A complete form with validation and error handling"
          name="form-complete"
        >
          <FormCompletePage />
        </ExampleSection>

        <ExampleSection
          title="TBD: Table with pagination, sort, filter, etc."
          name="form-complete"
        >
          <div>TBD</div>
        </ExampleSection>

        <ExampleSection
          title="TBD: Card drawer with card, img, title, and action buttons."
          name="form-complete"
        >
          <div>TBD</div>
        </ExampleSection>
      </main>
    </div>
  );
}
