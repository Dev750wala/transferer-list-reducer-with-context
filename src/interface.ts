export type User = {
    id: string;
    username: string;
    fullName: string;
    city: string;
    age: number;
    side: "left" | "right";
}


export type Fields = 'fullName' | 'username' | 'city' | 'age'
