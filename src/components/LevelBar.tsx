interface LevelBarProps {
	textLabel: string
	level: number
}

export default function LevelBar({ textLabel, level }: LevelBarProps) {
	return (
		<div className="flex flex-col justify-start items-start w-full">
			<label className="text-slate-900 text-sm font-semibold mb-1">
				{textLabel}
			</label>
			<div className="bg-slate-900 h-2 w-full rounded-full">
				<div
					style={{
						width: `calc((${level}*100%)/5) `,
					}}
					className="h-full bg-orange-600 rounded-full"
				></div>
			</div>
		</div>
	)
}
