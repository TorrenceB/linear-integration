import Issue from "./issue";

export default interface Cycle {
    id: string;
    name: string;
    number: number;
    startsAt: Date;
    endsAt: Date;
    teamName: string;
    description: string | null;
    issues: Issue[]
}