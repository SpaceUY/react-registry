"use client";

import { Button } from "@/registry/new-york/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/registry/new-york/ui/dialog";
import { ClipboardCopy } from "lucide-react";
import { McpIcon } from "./icons/link-icon";
import { ModeToggle } from "./theme-mode-toggle";
import { envVars } from "@/utils/environment";

export function Header() {
	const nextAppCommand =
		'pnpm create next-app@latest --tailwind --eslint --typescript --app --no-src-dir --turbopack --no-import-alias';
	const mcpJsonContent = `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"],
      "env": {
        "REGISTRY_URL": "${envVars.NEXT_PUBLIC_BASE_URL}/r/registry.json"
      }
    }
  }
}`;

	const handleGenericCopy = async (textToCopy: string, type: string) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			console.log(`${type} copied to clipboard!`);
			// Consider adding a toast notification for better UX
		} catch (err) {
			console.error(`Failed to copy ${type}: `, err);
		}
	};

	return (
		<header>
			<div className="max-w-7xl mx-auto flex items-center px-4 py-6">
				{/* App Name */}
				<div className="flex items-center gap-4">
					{/* Placeholder for a logo if you ever want one */}
					{/* <img src="/logo-placeholder.svg" alt="Alpine Logo" className="h-8 w-8 mr-2" /> */}
					<span className="text-xl font-semibold">Tatulino Registry</span>
					<div
						data-orientation="vertical"
						role="none"
						data-slot="separator-root"
						className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px !h-6"
					></div>
					<span className="text-muted-foreground hidden md:block line-clamp-1 text-sm">
						A registry for distributing code using shadcn.
					</span>
				</div>

				{/* Right side controls */}
				<div className="ml-auto flex gap-2">
					{/* MCP Dialog Button */}
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" className="">
								<McpIcon className="w-4 h-4" />
								MCP
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-2xl">
							<DialogHeader>
								<DialogTitle>Setup MCP</DialogTitle>
								<DialogDescription>
									Use the code below to configure the registry MCP in your IDE.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-6 py-4 text-sm">
								<div>
									<h3 className="text-base font-semibold mb-2 text-foreground">
										1. Create a new Next.js app
									</h3>
									<div className="relative bg-muted p-4 rounded-md border">
										<Button
											variant="ghost"
											size="icon"
											className="absolute top-2 right-2 h-7 w-7"
											onClick={() =>
												handleGenericCopy(nextAppCommand, "Next.js command")
											}
										>
											<ClipboardCopy className="h-4 w-4" />
											<span className="sr-only">Copy command</span>
										</Button>
										<pre className="text-muted-foreground whitespace-pre-wrap break-all font-mono text-xs">
											{nextAppCommand}
										</pre>
									</div>
								</div>
								<div>
									<h3 className="text-base font-semibold mb-2 text-foreground">
										2. Copy and paste the code into{" "}
										<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
											.cursor/mcp.json
										</code>
									</h3>
									<div className="relative bg-muted p-4 rounded-md border max-h-[300px] overflow-y-auto">
										<Button
											variant="ghost"
											size="icon"
											className="absolute top-2 right-2 h-7 w-7"
											onClick={() =>
												handleGenericCopy(mcpJsonContent, "MCP JSON config")
											}
										>
											<ClipboardCopy className="h-4 w-4" />
											<span className="sr-only">Copy JSON</span>
										</Button>
										<pre className="text-muted-foreground whitespace-pre font-mono text-xs">
											{mcpJsonContent}
										</pre>
									</div>
								</div>
							</div>
						</DialogContent>
					</Dialog>

					{/* Theme Toggle Button */}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
