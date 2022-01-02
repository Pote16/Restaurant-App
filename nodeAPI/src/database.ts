
import { DataTypes, Model, Sequelize } from "sequelize";
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

export interface ITable {
    tableID: number;
    anzahlPlatz: number;
    beschreibung: string;
}


export class User extends Model<IUser> implements IUser {
    userID!: number;
    name!: string;
    password!: string;
}

User.init(
    {
        userID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        tableName: "user_role",
        sequelize,
    }
);

export class Table extends Model<ITable> implements ITable {
    tableID!: number;
    anzahlPlatz!: number;
    beschreibung!: string;
}

Table.init(
    {
        tableID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        anzahlPlatz: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        beschreibung: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },
    {
        tableName: "table",
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },
    {
        tableName: "orderitem_status",
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(30), allowNull: false
        },
        desc: {
            type: DataTypes.STRING(500), allowNull: false
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30), allowNull: false
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(30), allowNull: false
        },
        desc: {
            type: DataTypes.STRING(30), allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE, allowNull: false
        },
        status: {
            type: DataTypes.STRING(30), allowNull: false
        }
    },
    {
        tableName: "menu_item",
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
            autoIncrement: true,
            primaryKey: true,
        },
        orderStatusID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: OrderStatus,
                key: "orderStatusID",
            }
        },
        orderDate: { type: DataTypes.DATE },
        tableID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Table,
                key: "tableID",
            }
        },
        paymentReference: { type: DataTypes.STRING(50), allowNull: false },
        paymentToken: { type: DataTypes.STRING(50), allowNull: false },
        totalAmount: { type: DataTypes.DOUBLE, allowNull: false },
    },
    {
        tableName: "order",
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
            autoIncrement: true,
            primaryKey: true,
            references: {
                model: Order,
                key: "orderID",
            },
        },
        itemID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            references: {
                model: MenuItem,
                key: "itemID",
            }
        },
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        orderItemSatusID: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: OrderItemStatus,
                key: "orderItemStatusID",
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

        await OrderItemStatus.sync({ force: true }); //{ force: true }
        await OrderStatus.sync({ force: true });
        await Table.sync({ force: true });
        await MenuItem.sync({ force: true });
        await MenuCategory.sync({ force: true });
        await Allergens.sync({ force: true });
        await UserRole.sync({ force: true });
        await User.sync({ force: true });
        await Order.sync({ force: true });
        await OrderedItem.sync({ force: true });
        console.log("Database Connection has been established successfully.");
    } catch (error) {
        logger.error("init() failed with -->", error);
        console.log("Error Database Connection" + error);
    }
}