"use client";

import useCycles from "#hooks/use-cycles";
import LinearCycle from "#components/LinearCycle";

export default function Home() {
	const { cycle, isLoading, error } = useCycles();

	const content = cycle ? (
		<LinearCycle cycle={cycle} />
	) : (
		<p>There is currently no active cycle.</p>
	);

	return (
		<div className="w-full h-full mt-10">
			<main className="flex flex-col items-center">
				{isLoading ? (
					<p className="m-40 font-bold">Retrieving Active Cycle...</p>
				) : (
					content
				)}
			</main>
		</div>
	);
}
