export interface UserProfileDetail {
    id: number,
    updated_time: Date,
    status: "Active",
    tag: string,
    name: string,
    email: string,
    company: string,
    phone: string,
    shoppingCart: string,

}

export interface UserProfile {
    "total": 1,
    consumers: [UserProfileDetail]
}