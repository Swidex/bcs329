import { Ride } from "./dataTypes";
import { Users } from "./mock-users";

export const Rides: Ride[] = [
    {
        id: 1,
        name: "Cardinal 21",
        type: "Shuttles",
        destination: "Fredrikson Court Dr.",
    },
    {
        id: 2,
        name: "Cardinal 25",
        type: "Shuttles",
        destination: "Fredrikson Court",
    },
    {
        id: 3,
        name: "Blue 3",
        type: "Shuttles",
        destination: "Friley Dorms",
    },
    {
        id: 4,
        name: "Ben's Group",
        type: "Carpools",
        destination: "Fredrikson Court Dr.",
        time: new Date(12/15/21),
        leader: Users[1],
        members: [Users[1]],
    }
]