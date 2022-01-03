
import { IMenuCategoryDB, ITableDB, IUserRoleDB } from "./database";

const MenuCategorySamples: IMenuCategoryDB[] = [
    {
        "categoryID": 1,
        "title": "Pizza",
        "desc": "Traditional italien pizza made with love from our professianal pizza baker Claudio. All pizzas are prepared in a traditional stone oven."
    },
    {
        "categoryID": 2,
        "title": "Pasta",
        "desc": "All pasta is 100% hand-made. This is the reason, why we are opened only at night. All over the day, we prepare fresh pasta!"
    },
    {
        "categoryID": 3,
        "title": "Weekly Specials",
        "desc": "Explore new dishes and promotions every week!"
    }
];

const TableSamples: ITableDB[] = [
    {
        tableID: 1,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 2,
        anzahlPlatz: 6,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 3,
        anzahlPlatz: 2,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 4,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    },
];

const UserRoleSamples: IUserRoleDB[] = [
    {
        roleID: 1,
        name: "backoffice"
    }, {
        roleID: 2,
        name: "Waiter"
    }, {
        roleID: 3,
        name: "kitchen"
    }, {
        roleID: 4,
        name: "customer"
    },
]



