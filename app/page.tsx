"use client";

import useCycle from "#hooks/use-cycle";
import LinearCycle from "#components/LinearCycle";

export default function Home() {
	const { cycle, isLoading, error } = useCycle();

	const burndown = cycle ? (
		<LinearCycle cycle={cycle} />
	) : (
		<p>There is currently no active cycle.</p>
	);

	return (
		<div className="w-full h-full my-10">
			<main className="flex flex-col items-center gap-4 w-full">
				<>
					<div className="flex flex-col items-center gap-4 w-full p-4 md:w-2/3 md:items-start">
						<div className="flex flex-col p-4 bg-[#161618] rounded-md w-full">
							<h1 className="text-3xl font-bold">Linear Cycle Burndown Project</h1>
							<p className="text-sm">
								Demonstration integrating Linear TypeScript SDK into a Next.js app. This
								chart plots the current cycle burndown for any team with a Linear setup.
							</p>
						</div>
						<div className="flex flex-col gap-4 h-fit md:flex-row">
							<div className="flex flex-col gap-2 w-full p-4 bg-[#161618] rounded-md">
								<h2 className="font-bold">What is a Burndown Chart?</h2>
								<p className="text-sm">
									In simple terms, a burndown chart shows the amount of work remaining
									against an allotted amount of time. It is commonly used in agile
									software development as a productivity measurement. Software teams use
									it to visualize project progress and identify trends.
								</p>
							</div>
							<div className="flex flex-col gap-2 w-full p-4 bg-[#161618] rounded-md">
								<h2 className="font-bold">How does a Burndown Chart work?</h2>
								<p className="text-sm">
									Agile software teams work in short bursts called <b>Sprints</b> (
									<b>Cycles</b> in the context of Linear), often lasting one to two
									weeks. A set of predetermined issues is assigned to the cycle, and each
									issue is assigned an estimate that reflects its perceived difficulty.
								</p>
								<p className="text-sm">
									A Burndown Chart tracks the teams progress over the cycle, showing two
									lines: <b>Ideal</b> and <b>Actual</b>. The Ideal line is a negative
									slope that begins at the total estimated effort (TEE) on the first day
									of the cycle and ends at 0 TEE on the final day. The Actual line is the
									real remaining effort and shifts up or down as project scope changes or
									issues are completed.
								</p>
								<p className="text-sm">
									The x-axis charts time, and the y-axis is the estimated units (“Story
									Points”, Hours, etc.).
								</p>
							</div>
							<div className="flex flex-col gap-2 w-full p-4 bg-[#161618] rounded-md">
								<h2 className="font-bold">What does this chart demonstrate?</h2>
								<p className="text-sm">
									I created this project as part of a job application to{" "}
									<a
										href="https://linear.app/"
										target="_blank"
										className="text-blue-500"
									>
										Linear
									</a>
									, a project management and issue tracking tool used in the software
									development world. The platform doesn’t currently offer Burndown as
									part of its product, which I believe is a deliberate philosophical
									decision.
								</p>
								<p className="text-sm">
									I created my own workspace in Linear and assigned several issues to the
									current cycle, i.e., beginning today, ending in seven days. Next, I
									built a small Next.js app that integrates Linear’s TypeScript API. The
									app pulls the issue-tracking data from my Linear workspace and maps it
									to the line graph that’s shown below.
								</p>
								<p className="text-sm">
									As I move issues in Linear from in progress to completed, the Actual
									line drops, moving closer to the Ideal line. In a real-world software
									project, the goal is to keep Actual as close to Ideal as possible.
								</p>
								<p className="text-sm">
									<a
										href="https://github.com/TorrenceB/linear-integration"
										target="_blank"
										className="text-blue-500"
									>
										Check out the Github Repo.
									</a>
								</p>
							</div>
						</div>
					</div>
					{isLoading ? (
						<p className="font-bold mt-40">Retrieving Active Cycle...</p>
					) : (
						<>{burndown}</>
					)}
				</>
			</main>
		</div>
	);
}
