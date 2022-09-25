import dayjs from "dayjs";

export function formatDateRelative(date: Date): string {
	const now = dayjs()

	return date.toISOString();
}
