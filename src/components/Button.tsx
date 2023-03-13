import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
	return (
		<button
			className="bg-orange-600 text-white w-full h-12 rounded font-semibold mt-6 transition-colors hover:bg-orange-700 active:translate-y-0.5"
			{...props}
		/>
	)
}
