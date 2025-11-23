declare let id: number | string;
type A = {
    name: string;
    age: number;
};
type B = {
    email: string;
    role: string;
};
type AB = A & B;
declare const user: AB;
type Status = "pending" | "done" | "canceled";
declare let taskStatus: Status;
declare let unknownValue: unknown;
export { id, user, taskStatus, unknownValue, type Status, type AB };
//# sourceMappingURL=exercise3.d.ts.map