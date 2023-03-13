import { useQuery } from "react-query"
import Button from "./components/Button"
import DeveloperInfo from "./components/DeveloperInfo"
import LevelBar from "./components/LevelBar"

export default function App() {
	const {
		data: breeds,
		error: breedsError,
		isLoading: isLoadingBreeds,
		isSuccess: isSuccessBreeds,
	} = useQuery(
		"breeds",
		async () => {
			const res = await fetch("https://api.thecatapi.com/v1/breeds")
			return await res.json()
		},
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		data: breed,
		error: breedError,
		isSuccess: isSuccessBreed,
		refetch: refetchBreed,
	} = useQuery(
		"breed",
		async () => {
			const breed = breeds[Math.floor(Math.random() * breeds.length)]

			const res = await fetch(
				`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`
			)

			const image = await res.json()

			return {
				...breed,
				image: image[0],
			}
		},
		{
			enabled: isSuccessBreeds,
			refetchOnWindowFocus: false,
		}
	)

	if (breedError || breedsError) {
		return (
			<div className="min-h-screen w-full bg-neutral-300 flex justify-center items-center p-6">
				<div className="max-w-md bg-white w-full p-6 rounded">
					<p className="text-slate-900 text-xl font-semibold">
						Something went wrong!
					</p>
					<Button
						className="bg-orange-600 text-white w-full h-12 rounded font-semibold mt-6 transition-colors hover:bg-orange-700 active:translate-y-0.5"
						onClick={() => {
							refetchBreed()
						}}
					>
						Try again
					</Button>
				</div>
			</div>
		)
	}

	if (isLoadingBreeds) {
		return (
			<div className="min-h-screen w-full bg-neutral-300 flex justify-center items-center p-6">
				<div className="max-w-md bg-white w-full p-6 rounded">
					<p className="text-slate-900 text-xl font-semibold text-center">
						Loading...
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen w-full bg-neutral-300 flex flex-col justify-center items-center p-6">
			<div className="max-w-md bg-white w-full p-6 rounded">
				{isSuccessBreed && (
					<>
						<img
							src={breed.image.url}
							alt=""
							className="w-full rounded"
						/>
						<p className="text-slate-900 text-xl font-semibold mt-2">
							{breed.name}
						</p>
						<p className="text-slate-900 text-sm mt-1">
							{breed.temperament}
						</p>
						<div className="w-full flex flex-col gap-y-4 mt-4">
							<LevelBar
								textLabel="Affection Level"
								level={breed.affection_level}
							/>
							<LevelBar
								textLabel="Energy Level"
								level={breed.energy_level}
							/>
							<LevelBar
								textLabel="Intelligence"
								level={breed.intelligence}
							/>
						</div>
					</>
				)}
				<Button
					className="bg-orange-600 text-white w-full h-12 rounded font-semibold mt-6 transition-colors hover:bg-orange-700 active:translate-y-0.5"
					onClick={() => {
						refetchBreed()
					}}
				>
					Get Cat 🐱
				</Button>
			</div>
			<DeveloperInfo />
		</div>
	)
}
