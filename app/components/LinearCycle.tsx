import React, { useState, useEffect } from "react";
import { Cycle, Team } from "@linear/sdk";
import {
	CartesianGrid,
	Legend,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	Line,
} from "recharts";

import type CycleIssue from "#types/cycle-issue";
import type BurndownPoint from "#types/burndown-point";
import createBurndown from "#util/create-burndown";

interface Props {
	cycle: Cycle;
}

const LinearCycle = ({ cycle }: Props) => {
	const [burndown, setBurndown] = useState<BurndownPoint[]>([]);
	const [team, setTeam] = useState<Team>();

	if (!cycle) {
		throw new Error(`cycle prop required`);
	}

	useEffect(() => {
		const fetchIssues = async () => {
			try {
				const team = await cycle.team;
				const issues = await cycle.issues();

				if (issues.nodes && issues.nodes?.length) {
					const cycleIssues: CycleIssue[] = await Promise.all(
						issues.nodes.map(async (issue) => {
							const state = await issue.state;

							const { id, title, estimate, completedAt, canceledAt } = issue;

							return {
								id,
								title,
								completedAt,
								canceledAt,
								estimate: estimate ?? 1,
								stateType: state?.type ?? "unstarted",
							};
						}),
					);

					const burndown = createBurndown(cycleIssues, cycle.startsAt, cycle.endsAt);

					setBurndown(burndown);
					setTeam(team);
				} else {
					console.warn(`There are no active issues for cycle ${cycle.id}`);
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					throw new Error(
						`@useCycles - An error occurred while retreiving assigned cycles ${error.message}`,
					);
				}

				throw error;
			}
		};

		fetchIssues();
	}, [cycle]);

	return (
		<div className="flex flex-col items-center gap-2 w-2/3 p-4 bg-[#161618] rounded-md">
			<div className="flex flex-col mr-auto gap-1">
				<h1 className="text-2xl font-bold">Cycle Burndown Chart</h1>
				<p className="font-bold">{team?.name}</p>
				<p>
					<b>Cycle:</b> {cycle.startsAt.toDateString()} -{" "}
					{cycle.endsAt.toDateString()}
				</p>
			</div>

			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={burndown}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="ideal"
						stroke="#f34e52"
						strokeDasharray="5 5"
						name="Ideal"
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="remaining"
						stroke="#5f6ad2"
						name="Actual"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default LinearCycle;
