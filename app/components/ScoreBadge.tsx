const ScoreBadge = ({ score }: { score: number }) => {
	let label: string
	let className: string

	if (score > 69) {
		label = 'Strong'
		className = 'score-badge bg-badge-green text-badge-green-text'
	} else if (score > 49) {
		label = 'Good Start'
		className = 'score-badge bg-badge-yellow text-badge-yellow-text'
	} else {
		label = 'Needs Work'
		className = 'score-badge bg-badge-red text-badge-red-text'
	}

	return (
		<div className={className}>
			<p>{label}</p>
		</div>
	)
}

export default ScoreBadge
