export default interface Issue {
    id: string;
    title: string;
    completedAt?: string | null;
    canceledAt?: string | null;
    stateType: string;
    estimate: number;
}