"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { toast } from "sonner";

export function ShadcnCliButton({
	name,
	className,
}: { name: string } & React.ComponentProps<typeof Button>) {
	const handleCopyCommand = () => {
		const command = `npx shadcn@latest add ${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`;
		navigator.clipboard.writeText(command).then(
			() => {
				toast.success("npx command copied to clipboard");
			},
			(err) => {
				toast.error("Failed to copy command: ", err);
			}
		);
	};

	return (
		<Button
			aria-label="Copy shadcn CLI command"
			size="sm"
			variant="outline"
			className={cn(className)}
			onClick={handleCopyCommand}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
				<rect width="256" height="256" fill="none"></rect>
				<line
					x1="208"
					y1="128"
					x2="128"
					y2="208"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="32"
				></line>
				<line
					x1="192"
					y1="40"
					x2="40"
					y2="192"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="32"
				></line>
			</svg>
			shadcn
		</Button>
	);
}
