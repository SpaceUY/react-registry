export const formatDate = (date: Date | null): string => {
	if (!date) return "";

	// Ensure date is a Date object if it's a string
	const dateObj = typeof date === "string" ? new Date(date) : date;

	if (isNaN(dateObj.getTime())) {
		// Handle invalid date string
		return "";
	}

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		hour12: true,
		timeZone: "America/New_York",
	};

	if (dateObj.getMinutes() !== 0) {
		timeOptions.minute = "2-digit";
	}

	const timeString = dateObj.toLocaleTimeString("en-US", timeOptions);

	return `SAT ${dateObj
		.toLocaleString("default", { month: "short", timeZone: "America/New_York" })
		.toUpperCase()} ${dateObj.getDate()} • ${timeString} ET`;
};
