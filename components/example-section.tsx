import React from "react";
import { OpenInV0Button } from "@/components/buttons/open-in-v0-button";
import { ShadcnCliButton } from "@/components/buttons/shadcn-cli-button";

interface ExampleSectionProps {
	title: string;
	name: string;
	children: React.ReactNode;
}

export function ExampleSection({ title, name, children }: ExampleSectionProps) {
	return (
		<div className="flex flex-col gap-4 min-h-[450px] relative">
			<div className="flex items-center justify-between">
				<h2 className="text-sm text-muted-foreground sm:pl-3">{title}</h2>
				<div className="flex gap-2">
					<ShadcnCliButton name={name} className="w-fit" />
					<OpenInV0Button name={name} className="w-fit" />
				</div>
			</div>
			<div className="flex items-center border rounded-lg p-4 justify-center min-h-[400px] relative">
				{children}
			</div>
		</div>
	);
}
