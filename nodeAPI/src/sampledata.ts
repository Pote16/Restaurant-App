
import { IAllergensDB, IMenuCategoryDB, IMenuItemDB, IMenuItemStatusDB, IOrderDB, IOrderedItemDB, IOrderItemStatusDB, IOrderStatusDB, ITableDB, IUserDB, IUserRoleDB } from "./database";

export const SamplesMenuCategory: IMenuCategoryDB[] = [
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

export const SamplesTable: ITableDB[] = [
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
    }, {
        tableID: 5,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 6,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 7,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 8,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 9,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 10,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    }, {
        tableID: 11,
        anzahlPlatz: 4,
        beschreibung: "tisch bei theke"
    },
];

export const SamplesUserRole: IUserRoleDB[] = [
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
];

export const SamplesOrderItemStatus: IOrderItemStatusDB[] = [
    {
        orderItemStatusID: 1,
        name: "ordered"
    }, {
        orderItemStatusID: 2,
        name: "cooked"
    }, {
        orderItemStatusID: 3,
        name: "delivered"
    }
];


export const SamplesOrderStatus: IOrderStatusDB[] = [
    {
        orderStatusID: 1,
        name: "open"
    }, {
        orderStatusID: 2,
        name: "cooked"
    }, {
        orderStatusID: 3,
        name: "delivered"
    }, {
        orderStatusID: 4,
        name: "in-transit"
    }, {
        orderStatusID: 5,
        name: "delivered"
    }
];

export const SamplesMenuItemStatus: IMenuItemStatusDB[] = [
    {
        id: 1,
        name: "available"
    }, {
        id: 2,
        name: "not available"
    }, {
        id: 3,
        name: "only preorder"
    },
];
export const SampleOrderedItem: IOrderedItemDB[] = [
    {
        orderID: 1,
        itemID: 1,
        number: 1,
        orderItemSatusID: 1,
    }, {
        orderID: 1,
        itemID: 2,
        number: 4,
        orderItemSatusID: 1,
    }, {
        orderID: 2,
        itemID: 4,
        number: 2,
        orderItemSatusID: 2,
    }, {
        orderID: 2,
        itemID: 2,
        number: 2,
        orderItemSatusID: 2,
    }, {
        orderID: 3,
        itemID: 3,
        number: 1,
        orderItemSatusID: 3,
    }, {
        orderID: 3,
        itemID: 4,
        number: 2,
        orderItemSatusID: 3,
    }, {
        orderID: 3,
        itemID: 5,
        number: 2,
        orderItemSatusID: 3,
    }
];

export const SampleOrders: IOrderDB[] = [
    {
        orderID: 1,
        orderStatusID: 1,
        orderDate: 1641211980,
        tableID: 1,
        paymentReference: "jsnuebgfglwh3u",
        paymentToken: "someJWTokenOfTrustedPaymentServer",
        totalAmount: 26.40
    }, {
        orderID: 2,
        orderStatusID: 2,
        orderDate: 1641211982,
        tableID: 2,
        paymentReference: "jsnuebgfglwh3u",
        paymentToken: "someJWTokenOfTrustedPaymentServer",
        totalAmount: 102.40
    }, {
        orderID: 3,
        orderStatusID: 3,
        orderDate: 1641211986,
        tableID: 3,
        paymentReference: "jsnuebgfglwh3u",
        paymentToken: "someJWTokenOfTrustedPaymentServer",
        totalAmount: 232.40
    },
];
export const SampleUser: IUserDB[] = [
    {
        userID: 1,
        name: "Giovanni",
        password: "password"
    }, {
        userID: 2,
        name: "Stefano",
        password: "password"
    }, {
        userID: 3,
        name: "Franco",
        password: "password"
    },
];


export const SampleMenuItems: IMenuItemDB[] = [
    {
        itemID: 1,
        title: "Pizza Margherita",
        desc: "Everyone knows and loves it – pizza margherita is a universally praised pizza for a reason. Originating in Naples, the margherita pizza has an interesting history supposedly rooted in a visit by Queen Margherita to Naples. The iconic pizza margherita is also known for representing the colours of the Italian flag: red tomato sauce, white mozzarella, and green basil. The combination of these ingredients creates a delicious pizza which has withstood the test of time",
        price: 6.80,
        status: 1,
    },
    {
        itemID: 2,
        title: "Marinara",
        desc: "Like the margherita pizza, pizza marinara also originated in Naples. This simple pizza is topped with plain marinara sauce, oregano and garlic. Essentially, it is very similar to the margherita pizza but lacks the cheese and basil. Apparently, back in the 1700s and 1800s, pizza marinara was popular with poor sailors and made on their ships as the ingredients used to make it were easily preserved.",
        price: 7.80,
        status: 1,
    }
    ,
    {
        itemID: 3,
        title: "PIZZA PUGLIESE",
        desc: "Originating in the Italian region of Apulia, pizza pugliese is generally topped with tomato, onion and mozzarella. However, there are many different variations of the pizza pugliese with some versions using oregano, capers and olives. Some recipes call for different cheeses to be used, such as mozzarella, provolone and pecorino and some even suggest that the tomato sauce be omitted completely. <br>Basically, you can mix and match the aforementioned ingredients to suit your own tastes and create your own perfect pizza pugliese.",
        price: 7.80,
        status: 1,
    },
    {
        itemID: 4,
        title: "PIZZA CAPRICCIOSA",
        desc: "The pizza capricciosa is one of the most iconic Italian pizzas and can be found in pretty much every pizzeria in Italy. Named for looking ‘capricious’, the abundantly rich pizza capricciosa is generally made up of ham, artichokes, mushrooms and black olives. As with many Italian pizzas, different regions and territories have taken the basic recipe and modified it to make it their own. For example, in Sicily, some prepare the pizza capricciosa with boiled eggs and, to the north, many prepare it with bits of sausage cut into rings.",
        price: 8.80,
        status: 1,
    },
    {
        itemID: 5,
        title: "PIZZA PROSCIUTTO CRUDO E RUCOLA",
        desc: "Though it can obviously be enjoyed at any time of the year the prosciutto crudo e rucola pizza is a summertime favourite thanks to its fresh flavours. Made with prosciutto, rocket and your choice of cheese (some of our favourites include parmesan, mozzarella and fior di latte), pizza prosciutto crudo e rucola is a dinner party favourite for being easy to make and universally loved.",
        price: 10.80,
        status: 1,
    },
    {
        itemID: 6,
        title: "Spaghetti Carbonara",
        desc: "Spaghetti with pancetta, pecorino, parmesan and eggs.",
        price: 9.80,
        status: 1,
    },
    {
        itemID: 7,
        title: "Lasagne al Forno Classico",
        desc: "Classical lasagne with ground meet sauce",
        price: 7.80,
        status: 1,
    },
    {
        itemID: 8,
        title: "Vesuvio al Ragù di Salsiccia",
        desc: "Vesuvio is a short pasta named for the famous volcano of the same name in Campania. The twists and turns of this short pasta make it perfect for catching the chunky bits of tomato and sausage in this Neapolitan-style ragù.",
        price: 10.80,
        status: 1,
    },
    {
        itemID: 9,
        title: "Bucatini all'Amatriciana",
        desc: "Named for the town of Amatrice, located about an hour northeast of Roma, this simple dish combines sweet and tangy tomato sauce with rich guanciale (cured pork jowl) and sharp Pecorino Romano DOP cheese, with a spicy kick from peperoncini, or dried chili flakes. The best part? The hollow bucatini make each bite extra saucy.",
        price: 10.80,
        status: 1,
    },
    {
        itemID: 10,
        title: "Spaghetti alle Vongole",
        desc: "Briny clams, white wine, garlic, and peperoncino create a light yet intensely flavorful sauce in this classic Neapolitan spaghetti dish. Look for the freshest clams possible (check with our fishmongers at your local Eataly for a recommendation), and high-quality, bronze-extruded pasta – the coarse texture will help the sauce cling to each strand.",
        price: 10.80,
        status: 1,
    }
];

export const SampleAllergens: IAllergensDB[] = [
    {
        allergenID: 1,
        name: "A"
    }, {
        allergenID: 2,
        name: "B"
    }, {
        allergenID: 3,
        name: "B"
    }, {
        allergenID: 4,
        name: "C"
    }, {
        allergenID: 5,
        name: "D"
    }, {
        allergenID: 6,
        name: "E"
    }, {
        allergenID: 7,
        name: "F"
    }, {
        allergenID: 8,
        name: "G"
    }, {
        allergenID: 9,
        name: "H"
    }
];
