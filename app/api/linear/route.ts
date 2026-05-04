import { LinearClient } from "@linear/sdk";
import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.LINEAR_API_KEY

    if (!apiKey) {
        return NextResponse.json(
            { error: "LINEAR_API_KEY is not configured" },
            { status: 500 }
        );
    }

    const linear = new LinearClient({
        apiKey
    })

    try {
        const teams = await linear.teams()
        const [team] = teams.nodes;

        if (!team) {
            return NextResponse.json({ cycles: [] });
        }

        const cycles = await team.cycles({ filter: { isActive: { eq: true } } })

        const resolvedCycles = await Promise.all(
            cycles.nodes.map(async (cycle) => {
                const issues = await cycle.issues();

                const resolvedIssues = await Promise.all(
                    issues.nodes.map(async (issue) => {
                        const state = await issue.state;
                        return {
                            id: issue.id,
                            title: issue.title,
                            estimate: issue.estimate ?? 1,
                            completedAt: issue.completedAt ?? null,
                            canceledAt: issue.canceledAt ?? null,
                            stateType: state?.type ?? "unstarted",
                        };
                    })
                );

                return {
                    id: cycle.id,
                    number: cycle.number,
                    name: cycle.name ?? null,
                    startsAt: cycle.startsAt,
                    endsAt: cycle.endsAt,
                    description: cycle.description ?? null,
                    issues: resolvedIssues,
                    teamName: team.name
                };
            })
        );

        return NextResponse.json({ cycles: resolvedCycles })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json(
            { error: `Failed to fetch Linear data: ${message}` },
            { status: 500 }
        );
    }
}