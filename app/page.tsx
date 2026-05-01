"use client";

import useCycles from "#hooks/use-cycles";
import LinearCycle from "@/app/components/LinearCycle";

export default function Home() {
	const { cycles, isLoading } = useCycles();

	const content = cycles?.length ? (
		<LinearCycle cycle={cycles[0]} />
	) : (
		<p>There are currently no active cycles</p>
	);

	return (
		<div className="w-full h-full mt-10">
			<main className="flex flex-col items-center">
				{isLoading ? (
					<p className="m-40 font-bold">Retrieving Active Cycles...</p>
				) : (
					content
				)}
			</main>
		</div>
	);
}
