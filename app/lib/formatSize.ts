const UNITS = ['KB', 'MB', 'GB'] as const

export function formatSize(bytes: number): string {
	if (bytes <= 0) return `0 ${UNITS[0]}`

	let size = bytes / 1024
	let unitIndex = 0

	while (size >= 1024 && unitIndex < UNITS.length - 1) {
		size /= 1024
		unitIndex++
	}

	const formatted =
		size >= 10 || unitIndex === 0
			? size.toFixed(0)
			: size.toFixed(1)

	return `${formatted} ${UNITS[unitIndex]}`
}
