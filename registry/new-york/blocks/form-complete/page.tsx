"use client";

import * as React from "react";
import { FormComplete } from "@/registry/new-york/blocks/form-complete/form-complete";
import { Toaster } from "@/registry/new-york/ui/sonner"; // Ensure this path is correct

// Simulate a delay for API calls
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FormCompletePage() {
	const handleFormSubmit = async (data: any) => {
		console.log("Form data submitted:", data);
		// Simulate API call
		await sleep(1000);

		// Example of throwing an error to test catch block and error toast
		// if (data.username === "error") G{
		//   throw new Error("Simulated server error!")
		// }

		// Simulate a successful submission
		return { success: true, message: "Data processed successfully." };
	};

	const handleCancel = () => {
		console.log("Form cancelled");
		alert("Form cancelled by user."); // Or use a toast for cancellation feedback
	};

	return (
		<div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
			<h1 className="text-3xl font-bold mb-8">Advanced Form Example</h1>
			<FormComplete
				onFormSubmit={handleFormSubmit}
				onCancel={handleCancel}
				defaultValues={{
					username: "testuser",
					email: "test@example.com",
				}}
			/>
			<Toaster richColors position="top-right" />
		</div>
	);
}
