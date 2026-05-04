import Issue from "./issue";

export default interface Cycle {
    id: string;
    name: string;
    number: number;
    startsAt: string;
    endsAt: string;
    teamName: string;
    description: string | null;
    issues: Issue[]
}