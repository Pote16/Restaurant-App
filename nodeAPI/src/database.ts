import { DataTypes, INTEGER, Model, Sequelize } from "sequelize";
import { dblogger } from "./Logger";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `localhost:${PORT}`;

const logger = dblogger;
function log(sql: string, timing?: number): boolean {
    logger.log("info", sql);
    return true;
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mariadb",
    host: DB_HOST,
    port: DB_PORT,
    logging: false, //logging: log,
});


export interface IOrderedItem {
    orderID: number;
    itemID: number;
    number: number;
    orderItemSatusID: number;
}

export interface IOrderItemStatus {
    orderItemStatusID: number;
    name: string;
}

export interface IOrder {
    orderID: number;
    orderStatusID: number;
    orderDate: Date;
    tableID: number;
    paymentReference: string;
    paymentToken: string;
    totalAmount: number;
}

export interface IOrderStatus {
    orderStatusID: number;
    name: string;
}

export interface IUser {
    userID: number;
    name: string;
    password: string;
}

export interface IUserRole {
    roleID: number;
    name: String;
}

export interface IMenuItem {
    itemID: number;
    title: string;
    desc: string;
    price: number;
    status: string;
}

export interface IMenuCategory {
    categoryID: number;
    title: string;
    desc: string;
}

export interface IAllergens {
    allergenID: number;
    name: string;
}


export class User extends Model<IUser> implements IUser {
    userID!: number;
    name!: string;
    password!: string;
}

User.init(
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING(100) },
        password: { type: DataTypes.STRING(100) },
    },
    {
        tableName: "user",
        sequelize,
    }
);


export class UserRole extends Model<IUserRole> implements IUserRole {
    roleID!: number;
    name!: String;
}

UserRole.init(
    {
        roleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
        }
    },
    {
        tableName: "user_role",
        sequelize,
    }
);

export class OrderStatus extends Model<IOrderStatus> implements IOrderStatus {
    orderStatusID!: number;
    name!: string;
}

OrderStatus.init(
    {
        orderStatusID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
        }
    },
    {
        tableName: "order_status",
        sequelize,
    }
);

export class OrderItemStatus extends Model<IOrderItemStatus> implements IOrderItemStatus {
    orderItemStatusID!: number;
    name!: string;
}

OrderItemStatus.init(
    {
        orderItemStatusID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
        }
    },
    {
        tableName: "orderitem_status",
        sequelize,
    }
);

export class Order
    extends Model<IOrder>
    implements IOrder {
    orderID!: number;
    orderStatusID!: number;
    orderDate!: Date;
    tableID!: number;
    paymentReference!: string;
    paymentToken!: string;
    totalAmount!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        orderID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
        },
        orderStatusID: {
            type: DataTypes.STRING(20),
            references: {
                model: OrderStatus.tableName,
                key: OrderStatus.primaryKeyAttribute,
            }
        },
        orderDate: { type: DataTypes.DATE },
        tableID: { type: DataTypes.INTEGER },
        paymentReference: { type: DataTypes.STRING(100) },
        paymentToken: { type: DataTypes.STRING(100) },
        totalAmount: { type: DataTypes.DOUBLE },
    },
    {
        tableName: "order",
        sequelize,
    }
);


export class MenuCategory extends Model<IMenuCategory> implements IMenuCategory {
    categoryID!: number;
    title!: string;
    desc!: string;
}

MenuCategory.init(
    {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title!: {
            type: DataTypes.STRING(30),
        },
        desc: {
            type: DataTypes.STRING(500),
        }
    },
    {
        tableName: "menu_category",
        sequelize,
    }
);

export class Allergens extends Model<IAllergens> implements IAllergens {
    allergenID!: number;
    name!: string;
}

Allergens.init(
    {
        allergenID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
        }
    },
    {
        tableName: "allergen",
        sequelize,
    }
);

export class MenuItem extends Model<IMenuItem> implements IMenuItem {
    itemID!: number;
    title!: string;
    desc!: string;
    price!: number;
    status!: string;
}

MenuItem.init(
    {
        itemID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(30),
        },
        desc: {
            type: DataTypes.STRING(30),
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        status: {
            type: DataTypes.STRING(30),
        }
    },
    {
        tableName: "menu_item",
        sequelize,
    }
);

export class OrderedItem
    extends Model<IOrderedItem>
    implements IOrderedItem {
    public orderID!: number;
    public itemID!: number;
    public number!: number;
    public orderItemSatusID!: number;
}

OrderedItem.init(
    {
        orderID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            references: {
                model: Order.tableName,
                key: Order.primaryKeyAttribute,
            },
        },
        itemID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            references: {
                model: MenuItem.tableName,
                key: MenuItem.primaryKeyAttribute,
            }
        },
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
        },

        orderItemSatusID: {
            type: DataTypes.NUMBER,
            references: {
                model: OrderItemStatus.tableName,
                key: OrderItemStatus.primaryKeyAttribute,
            }
        },
    },
    {
        tableName: "ordered_item",
        sequelize,
    }
);

//Assosiation Tables
MenuItem.belongsToMany(Allergens, { through: 'Allergen_Assosiations' });
Allergens.belongsToMany(MenuItem, { through: 'Allergen_Assosiations' });

MenuItem.belongsToMany(MenuCategory, { through: 'Category_Assosiations' });
MenuCategory.belongsToMany(MenuItem, { through: 'Category_Assosiations' });

UserRole.belongsToMany(User, { through: 'User_Role_Assosiations' });
User.belongsToMany(UserRole, { through: 'Category_Assosiations' });


export async function init(): Promise<void> {
    try {
        await sequelize.authenticate();
        logger.info("Database Connection has been established successfully.");

        await OrderItemStatus.sync(); //{ force: true }
        await OrderedItem.sync();
        await OrderStatus.sync();
        await UserRole.sync();
        await User.sync();
        await MenuCategory.sync();
        await Allergens.sync();
        await MenuItem.sync();
        await Order.sync();
        console.log("Database Connection has been established successfully.");
    } catch (error) {
        logger.error("init() failed with -->", error);
        console.log("Error Database Connection" + error);
    }
}