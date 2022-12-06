import { Course } from "./course";

export const Courses: Course[] = [
    {
        id: 0,
        name: "COMS 329",
        professor: "Ashraf Gaffar",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        requirements: "COMS 309, COMS 228",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        enrolled: true,
        assignments: [
            {
                name: "Risks & Lessons Learned Deliverable",
                course: "COMS 329",
                date: new Date("12/5/22")
            },
            {
                name: "Prototype Deliverable",
                course: "COMS 329",
                date: new Date("12/8/22")
            },
            {
                name: "Portfolio Deliverable",
                course: "COMS 329",
                date: new Date("12/15/22")
            }
        ]
    },
    {
        id: 1,
        name: "CPRE 309",
        professor: "Mai Zheng",
        desc: "Integer quis auctor elit sed vulputate. Neque ornare aenean euismod elementum nisi quis eleifend quam. Fermentum leo vel orci porta non pulvinar neque.",
        requirements: "CPRE 388",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        enrolled: false,
        assignments: [
            {
                name: "Lab 8",
                course: "CPRE 309",
                date: new Date("12/9/22")
            },
            {
                name: "Final Exam",
                course: "COMS 329",
                date: new Date("12/13/22")
            }
        ]
    },
    {
        id: 2,
        name: "COMS 310",
        professor: "Tony Stark",
        desc: "Vitae elementum curabitur vitae nunc sed velit dignissim. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum.",
        requirements: "CPRE 228",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        enrolled: false,
        assignments: [
            {
                name: "Quiz 6",
                course: "COMS 310",
                date: new Date("12/6/22")
            },
            {
                name: "Final Exam",
                course: "COMS 310",
                date: new Date("12/15/22")
            }
        ]
    },
    {
        id: 3,
        name: "COMS 252",
        professor: "Bob Dylan",
        desc: "Elit ullamcorper dignissim cras tincidunt lobortis. Non odio euismod lacinia at quis risus sed. Faucibus a pellentesque sit amet porttitor eget.",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        enrolled: false,
        assignments: [
            {
                name: "Lab 10",
                course: "COMS 252",
                date: new Date("12/6/22")
            },
            {
                name: "Final Exam",
                course: "COMS 252",
                date: new Date("12/14/22")
            }
        ]
    },
]