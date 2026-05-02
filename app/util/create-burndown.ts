import CycleIssue from "#types/cycle-issue";
import BurndownPoint from "#types/burndown-point";

const createBurndown = (
    issues: CycleIssue[],
    startsAt: Date,
    endsAt: Date,
) => {
    const days: BurndownPoint[] = [];
    // Sum of estimates for every issue.
    const totalWork = issues.reduce(
        (sum, currIssue) => sum + currIssue.estimate,
        0,
    );

    const msPerDay = 1000 * 60 * 60 * 24;

    // Round up to nearest day
    const totalDays = Math.ceil(
        (endsAt.getTime() - startsAt.getTime()) / msPerDay,
    );

    for (let day = 0; day <= totalDays; day++) {
        const date = new Date(startsAt.getTime() + day * msPerDay);

        // Work remaining = total - anything completed or canceled by the end of today.
        const burnedByNow = issues
            .filter((issue) => {
                // v2: Remove canceled issues from the picture. Mis-representation of the data.
                const finishedAt = issue.completedAt ?? issue.canceledAt;

                return finishedAt && new Date(finishedAt) <= date;
            })
            .reduce((sum, currIssue) => sum + currIssue.estimate, 0);

        const remaining = totalWork - burnedByNow;
        const ideal = totalWork * (1 - day / totalDays);

        days.push({
            date: date.toISOString().slice(0, 10),
            remaining,
            ideal: Math.max(0, ideal),
        });
    }

    return days;
};

export default createBurndown;