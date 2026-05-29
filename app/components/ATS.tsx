type Suggestion = {
	type: 'good' | 'improve'
	tip: string
}

const getScoreConfig = (score: number) => {
	if (score > 69) {
		return {
			gradient: 'from-green-100',
			icon: '/icons/ats-good.svg',
			subtitle: 'Excellent ATS compatibility',
			description:
				'Your resume is well-structured for applicant tracking systems. Keywords, formatting, and section layout should parse reliably when recruiters search and filter candidates.',
			closing:
				'Keep refining details for each role — small tweaks can still strengthen your match.',
		}
	}
	if (score > 49) {
		return {
			gradient: 'from-yellow-100',
			icon: '/icons/ats-warning.svg',
			subtitle: 'Decent, but could be stronger',
			description:
				'Your resume may pass some ATS checks, but formatting, keywords, or structure could cause parsing issues. Address the suggestions below to improve discoverability.',
			closing:
				'Apply the tips below — each fix brings you closer to a resume that ATS tools read correctly.',
		}
	}
	return {
		gradient: 'from-red-100',
		icon: '/icons/ats-bad.svg',
		subtitle: 'Needs ATS optimization',
		description:
			'Applicant tracking systems may struggle to read your resume. Focus on standard headings, plain formatting, and role-relevant keywords so your experience is not missed.',
		closing:
			'Work through the suggestions below — improving ATS compatibility can significantly increase your chances of being seen.',
	}
}

const ATS = ({
	score,
	suggestions,
}: {
	score: number
	suggestions: Suggestion[]
}) => {
	const config = getScoreConfig(score)

	return (
		<div
			className={`rounded-2xl shadow-md w-full bg-gradient-to-b ${config.gradient} to-white p-6 flex flex-col gap-6`}
		>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-row items-center gap-4'>
					<img
						src={config.icon}
						alt=''
						className='w-12 h-12 shrink-0'
						aria-hidden
					/>
					<h3 className='text-2xl font-bold text-gray-900'>
						ATS Score — {score}/100
					</h3>
				</div>

				<div className='flex flex-col gap-2'>
					<p className='text-lg font-semibold text-gray-800'>
						{config.subtitle}
					</p>
					<p className='text-sm text-gray-500'>{config.description}</p>
				</div>
			</div>

			{suggestions.length > 0 && (
				<ul className='flex flex-col gap-3'>
					{suggestions.map((item, index) => (
						<li key={index} className='flex flex-row items-start gap-3'>
							<img
								src={
									item.type === 'good'
										? '/icons/check.svg'
										: '/icons/warning.svg'
								}
								alt=''
								className='w-5 h-5 mt-0.5 shrink-0'
								aria-hidden
							/>
							<p className='text-sm text-gray-700'>{item.tip}</p>
						</li>
					))}
				</ul>
			)}

			<p className='text-sm font-medium text-gray-600'>{config.closing}</p>
		</div>
	)
}

export default ATS
