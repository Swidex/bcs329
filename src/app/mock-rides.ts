import { Shuttle, Carpool } from "./dataTypes";
import { Users } from "./mock-users";

export const Shuttles: Shuttle[] = [
    {
        id: 0,
    },
    {
        id: 1,
        name: "Cardinal 21",
        destination: "Fredrikson Court Dr.",
    },
    {
        id: 2,
        name: "Cardinal 25",
        destination: "Fredrikson Court",
    },
    {
        id: 3,
        name: "Blue 3",
        destination: "Friley Dorms",
    },
]

export const Carpools: Carpool[] = [
    {
        id: 0,
    },
    {
        id: 1,
        group_name: "Ben's Group",
        destination: "Fredrikson Court Dr.",
        status: "closed",
        time: new Date(12/15/21),
        owner: Users[1],
        members: [Users[1]],
    },
    {
        id: 2,
        group_name: "The Avengers",
        destination: "Manhattan",
        status: "open",
        time: new Date(12/15/21),
        owner: Users[5],
        members: [Users[5]],
    }
]