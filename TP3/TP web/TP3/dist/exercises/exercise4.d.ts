interface User {
    id: number;
    name: string;
    email?: string;
    readonly isAdmin: boolean;
}
declare const user1: User;
declare const user2: User;
interface Admin extends User {
    permissions: string[];
}
declare const admin1: Admin;
interface UserProfile extends User {
    avatar?: string;
    lastLogin: Date;
}
declare const userProfile: UserProfile;
export type { User, Admin, UserProfile };
export { user1, user2, admin1, userProfile };
//# sourceMappingURL=exercise4.d.ts.map