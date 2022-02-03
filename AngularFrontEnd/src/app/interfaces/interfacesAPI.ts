
export interface IOrderAPI {
    orderId: number;
    status: number;
    orderDate: number;
    tableId: number;
    paymentReference: string;
    paymentToken: string;
    totalAmount: number;
    orderedItems: IOrderedItemAPI[];
}

export interface IOrderedItemAPI {
    itemId: number;
    number: number;
    status: number;
}

export interface IUserAPI extends INewUserAPI {
    userID: number;
}

export interface INewUserAPI {
    name: string;
    roles: number[];
}

export interface ISecretUserAPI {
    name: string;
    password: string;
    roles: number[];
}

export interface IUserRoleAPI {
    roleID: number;
    name: string;
}

export interface IMenuItemAPI extends INewMenuItemAPI {
    itemId: number;
}

export interface INewMenuItemAPI {
    title: string;
    desc: string;
    price: number;
    category: number[];
    allergens: number[];
    status: number;
}


export interface IMenuCategoryAPI extends INewMenuCategoryAPI {
    categoryId: number;
}

export interface INewMenuCategoryAPI {
    title: string;
    desc: string;
}

export interface IGuestRequestAPI {
    guestReguestID: number;
    status: number;
    tableID: number;
}

export interface ITableAPI extends INewTableAPI {
    tableID: number;
}

export interface INewTableAPI {
    tischNummer: number,
    anzahlPlatz: number;
    beschreibung: string | null; // optinal value
}


export interface IAllergensAPI {
    allergenID: number;
    name: string;

}

export interface IMenuItemStatusAPI {
    id: number;
    name: number;
}