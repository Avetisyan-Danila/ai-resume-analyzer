import { cn } from '~/lib/cn'
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from './Accordion'

type Tip = {
	type: 'good' | 'improve'
	tip: string
	explanation: string
}

const ScoreBadge = ({ score }: { score: number }) => {
	const config =
		score > 69
			? {
					bg: 'bg-badge-green',
					text: 'text-badge-green-text',
					showCheck: true,
				}
			: score > 39
				? {
						bg: 'bg-badge-yellow',
						text: 'text-badge-yellow-text',
						showCheck: false,
					}
				: {
						bg: 'bg-badge-red',
						text: 'text-badge-red-text',
						showCheck: false,
					}

	return (
		<div className={cn('score-badge gap-2', config.bg)}>
			{config.showCheck && (
				<img
					src='/icons/check.svg'
					alt=''
					className='w-4 h-4 shrink-0'
					aria-hidden
				/>
			)}
			<span className={cn('text-sm font-semibold', config.text)}>
				{score}/100
			</span>
		</div>
	)
}

const CategoryHeader = ({
	title,
	categoryScore,
}: {
	title: string
	categoryScore: number
}) => (
	<div className='flex w-full flex-row items-center justify-between gap-4'>
		<h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
		<ScoreBadge score={categoryScore} />
	</div>
)

const CategoryContent = ({ tips }: { tips: Tip[] }) => (
	<div className='flex flex-col gap-6'>
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
			{tips.map((item, index) => (
				<div key={index} className='flex flex-row items-start gap-3'>
					<img
						src={
							item.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'
						}
						alt=''
						className='mt-0.5 h-5 w-5 shrink-0'
						aria-hidden
					/>
					<p className='text-sm font-medium text-gray-700'>{item.tip}</p>
				</div>
			))}
		</div>

		<ul className='flex flex-col gap-3'>
			{tips.map((item, index) => (
				<li
					key={index}
					className={cn(
						'rounded-xl p-4 text-sm leading-relaxed',
						item.type === 'good'
							? 'bg-badge-green text-badge-green-text'
							: 'bg-badge-red text-badge-red-text',
					)}
				>
					{item.explanation}
				</li>
			))}
		</ul>
	</div>
)

const SECTIONS = [
	{
		id: 'tone-style',
		title: 'Tone & Style',
		getCategory: (feedback: Feedback) => feedback.toneAndStyle,
	},
	{
		id: 'content',
		title: 'Content',
		getCategory: (feedback: Feedback) => feedback.content,
	},
	{
		id: 'structure',
		title: 'Structure',
		getCategory: (feedback: Feedback) => feedback.structure,
	},
	{
		id: 'skills',
		title: 'Skills',
		getCategory: (feedback: Feedback) => feedback.skills,
	},
] as const

const Details = ({ feedback }: { feedback: Feedback }) => (
	<Accordion className='w-full rounded-2xl bg-white shadow-md'>
		{SECTIONS.map(section => {
			const category = section.getCategory(feedback)

			return (
				<AccordionItem key={section.id} id={section.id}>
					<AccordionHeader itemId={section.id}>
						<CategoryHeader
							title={section.title}
							categoryScore={category.score}
						/>
					</AccordionHeader>
					<AccordionContent itemId={section.id}>
						<CategoryContent tips={category.tips} />
					</AccordionContent>
				</AccordionItem>
			)
		})}
	</Accordion>
)

export default Details
