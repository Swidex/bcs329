import { Course, User } from "./dataTypes";
import { Users } from "./mock-users";

export const Courses: Course[] = [
    {
        id: 0
    },
    {
        id: 1,
        name: "COMS 329",
        prof: Users[2],
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        requirements: "COMS 309, COMS 228",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        students: [Users[1]],
        assignments: [
            {
                name: "Risks & Lessons Learned Deliverable",
                course: "COMS 329",
                date: new Date("12/5/22"),
                description: "Estimate the risks of your project and explain the lessons you have learned over the planning period of the project."
            },
            {
                name: "Prototype Deliverable",
                course: "COMS 329",
                date: new Date("12/8/22"),
                description: "A working prototype showing the main screens of the user side. You will need to submit both the source code (HTML) as well as screenshots of all developed screens."
            },
            {
                name: "Portfolio Deliverable",
                course: "COMS 329",
                date: new Date("12/15/22"),
                description: "Gather together all your team's deliverables into one, single deliverable."
            }
        ],
    },
    {
        id: 2,
        name: "CPRE 308",
        prof: Users[3],
        desc: "Integer quis auctor elit sed vulputate. Neque ornare aenean euismod elementum nisi quis eleifend quam. Fermentum leo vel orci porta non pulvinar neque.",
        requirements: "CPRE 388",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        students: [],
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
        id: 3,
        name: "COMS 310",
        prof: Users[4],
        desc: "Vitae elementum curabitur vitae nunc sed velit dignissim. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum.",
        requirements: "CPRE 228",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        students: [],
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
        id: 4,
        name: "COMS 252",
        prof: Users[5],
        desc: "Elit ullamcorper dignissim cras tincidunt lobortis. Non odio euismod lacinia at quis risus sed. Faucibus a pellentesque sit amet porttitor eget.",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        students: [],
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
    {
        id: 5,
        name: "TEST 101",
        prof: Users[1],
        desc: "N/A",
        start_date: new Date("8/20/22"),
        end_date: new Date("12/16/22"),
        students: [Users[1]],
        assignments: []
    }
]