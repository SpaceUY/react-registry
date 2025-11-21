"use client";

import FeedbackComponentCSS from "@/components/animations/button/feedback/feedback";
import SmoothButton from "@/components/animations/button/moving-label/moving-label";
import CardZoom from "@/components/animations/card/card-zoom/card-zoom";
import MultiStepComponent from "@/components/animations/card/steps/steps";
import { TrashAnimation } from "@/components/animations/fun/trash/components/trash-animation";
import ItemsPopup from "@/components/animations/list/items-popup/items-popup";
import { ExampleSection } from "@/components/example-section";

export default function AnimationsPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Animations</h1>
        <p className="text-muted-foreground">
          Animations for the custom registry.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <ExampleSection
          title="Moving label button with animation"
          name="moving-label-button"
        >
          <SmoothButton />
        </ExampleSection>

        <ExampleSection title="Items popup with animation" name="items-popup">
          <ItemsPopup />
        </ExampleSection>

        <ExampleSection title="Card zoom with animation" name="card-zoom">
          <CardZoom />
        </ExampleSection>

        <ExampleSection
          title="Feedback button with animation"
          name="feedback-button"
        >
          <FeedbackComponentCSS />
        </ExampleSection>

        <ExampleSection
          title="Multi-step card with animation"
          name="multi-step-card"
        >
          <MultiStepComponent />
        </ExampleSection>

        <ExampleSection title="Trash animation with animation" name="trash-animation">
          <TrashAnimation />
        </ExampleSection>
      </main>
    </div>
  );
}
