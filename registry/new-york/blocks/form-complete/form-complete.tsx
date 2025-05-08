"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { Calendar } from "@/registry/new-york/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/new-york/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/new-york/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/new-york/ui/select";

// Zod Schema
const formSchema = z
	.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
		quantity: z.coerce
			.number({
				required_error: "Quantity is required",
				invalid_type_error: "Quantity must be a number",
			})
			.min(1, { message: "Quantity must be at least 1." })
			.positive({ message: "Quantity must be a positive number." }),
		dob: z.date({
			required_error: "A date of birth is required.",
		}),
		category: z.enum(["category1", "category2", "category3"], {
			required_error: "Please select a category.",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters.",
		}),
		confirmPassword: z.string().min(8, {
			message: "Confirm Password must be at least 8 characters.",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ["confirmPassword"], // path of error
	});

type FormValues = z.infer<typeof formSchema>;

interface FormCompleteProps {
	onFormSubmit: (data: FormValues) => Promise<any>;
	onCancel?: () => void;
	defaultValues?: Partial<FormValues>;
}

export function FormComplete({
	onFormSubmit,
	onCancel,
	defaultValues,
}: FormCompleteProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			quantity: 1,
			category: undefined,
			password: "",
			confirmPassword: "",
			...defaultValues,
		},
	});

	const [isSubmitting, setIsSubmitting] = React.useState(false);

	async function onSubmit(data: FormValues) {
		setIsSubmitting(true);
		try {
			await onFormSubmit(data);
			toast.success("Form submitted successfully!");
			form.reset(); // Optionally reset form on success
		} catch (error) {
			console.error("Submission error:", error);
			toast.error(
				error instanceof Error ? error.message : "An unexpected error occurred."
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>Complete Form</CardTitle>
				<CardDescription>
					Fill out the details below. All fields are required.
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Username */}
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="yourusername" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="user@example.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Quantity */}
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="1"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Date of Birth */}
						<FormField
							control={form.control}
							name="dob"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date of birth</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Category Select */}
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="category1">Category 1</SelectItem>
											<SelectItem value="category2">Category 2</SelectItem>
											<SelectItem value="category3">Category 3</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Spacer for layout on smaller screens, can be removed if not desired */}
						<div className="hidden md:block"></div>

						{/* Password */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Confirm Password */}
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end gap-2 mt-4">
						{onCancel && (
							<Button
								type="button"
								variant="outline"
								onClick={onCancel}
								disabled={isSubmitting}
							>
								Cancel
							</Button>
						)}
						<Button
							type="submit"
							disabled={isSubmitting || !form.formState.isValid}
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
