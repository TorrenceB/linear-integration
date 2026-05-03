import React, { useState, useEffect } from "react";
import {
	CartesianGrid,
	Legend,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	Line,
} from "recharts";

import type Cycle from "#types/cycle";
import type BurndownPoint from "#types/burndown-point";
import createBurndown from "#util/create-burndown";

interface Props {
	cycle: Cycle;
}

const LinearCycle = ({ cycle }: Props) => {
	const [burndown, setBurndown] = useState<BurndownPoint[]>([]);

	if (!cycle) {
		throw new Error(`cycle prop required`);
	}

	useEffect(() => {
		const fetchIssues = async () => {
			try {
				const burndown = createBurndown(cycle.issues, cycle.startsAt, cycle.endsAt);

				setBurndown(burndown);
			} catch (error: unknown) {
				const message = error instanceof Error ? error.message : "Unknown error";

				throw new Error(
					`@useCycles - An error occurred while retreiving assigned cycles ${message}`,
				);
			}
		};

		fetchIssues();
	}, [cycle]);

	const start = new Date(cycle.startsAt);
	const end = new Date(cycle.endsAt);

	return (
		<div className="flex flex-col items-center gap-4 w-2/3 p-4 bg-[#161618] rounded-md">
			<div className="flex flex-col mr-auto gap-1">
				<h1 className="text-2xl font-bold">Cycle Burndown Chart</h1>
				<p className="font-bold">{cycle.teamName}</p>
				<p>
					<b>Cycle:</b> {start.toDateString()} - {end.toDateString()}
				</p>
				{cycle?.description && (
					<p>
						<b>Goal:</b> {cycle.description}
					</p>
				)}
			</div>

			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={burndown}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" stroke="#fff" />
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
