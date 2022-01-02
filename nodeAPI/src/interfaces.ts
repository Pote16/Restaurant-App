
export interface IOrderAPI {
    orderId: number;
    status: string;
    orderDate: Date;
    tableId: number;
    paymentReference: string;
    paymentToken: string;
    totalAmount: number;
    orderedItems: IOrderedItemAPI[];
}

export interface IOrderedItemAPI {
    itemId: number;
    number: number;
    status: string;
}

export interface IUserAPI {
    userID: number;
    name: string;
    role: string[];
    password: string;
}

export interface IMenuItemAPI {
    itemId: number;
    title: string;
    desc: string;
    price: number;
    category: number[];
    allergens: string[];
    status: string;
}


export interface IMenuCategoryAPI {
    categoryId: number;
    title: string;
    desc: string;
}