export default interface CycleIssue {
    id: string;
    title: string;
    completedAt?: Date | null | undefined;
    canceledAt?: Date | null | undefined;
    stateType: string;
    estimate: number;
}