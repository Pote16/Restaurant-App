
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
    logging: true, //logging: log,
});


export interface IOrderedItemDB {
    orderID: number;
    itemID: number;
    number: number;
    orderItemSatusID: number;
}

export interface IOrderItemStatusDB {
    orderItemStatusID: number;
    name: string;
}

export interface IOrderDB {
    orderID: number;
    orderStatusID: number;
    orderDate: number;
    tableID: number;
    paymentReference: string;
    paymentToken: string;
    totalAmount: number;
}

export interface IOrderStatusDB {
    orderStatusID: number;
    name: string;
}

export interface IUserDB {
    userID: number;
    name: string;
    password: string;
}

export interface IUserRoleDB {
    roleID: number;
    name: String;
}

export interface IMenuItemDB {
    itemID: number;
    title: string;
    desc: string;
    price: number;
    status: string;
}

export interface IMenuCategoryDB {
    categoryID: number;
    title: string;
    desc: string;
}

export interface IAllergensDB {
    allergenID: number;
    name: string;
}

export interface ITableDB {
    tableID: number;
    anzahlPlatz: number;
    beschreibung: string;
}


export class User extends Model<IUserDB> implements IUserDB {
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
            allowNull: false,
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


export class UserRole extends Model<IUserRoleDB> implements IUserRoleDB {
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

export class Table extends Model<ITableDB> implements ITableDB {
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

export class OrderStatus extends Model<IOrderStatusDB> implements IOrderStatusDB {
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

export class OrderItemStatus extends Model<IOrderItemStatusDB> implements IOrderItemStatusDB {
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




export class MenuCategory extends Model<IMenuCategoryDB> implements IMenuCategoryDB {
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

export class Allergens extends Model<IAllergensDB> implements IAllergensDB {
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

export class MenuItem extends Model<IMenuItemDB> implements IMenuItemDB {
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
    extends Model<IOrderDB>
    implements IOrderDB {
    orderID!: number;
    orderStatusID!: number;
    orderDate!: number;
    tableID!: number;
    paymentReference!: string;
    paymentToken!: string;
    totalAmount!: number;
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
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
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
    extends Model<IOrderedItemDB>
    implements IOrderedItemDB {
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
            type: DataTypes.INTEGER.UNSIGNED,
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
MenuItem.belongsToMany(Allergens, { through: 'allergen_assosiations' });
Allergens.belongsToMany(MenuItem, { through: 'allergen_assosiations' });

MenuItem.belongsToMany(MenuCategory, { through: 'category_assosiations' });
MenuCategory.belongsToMany(MenuItem, { through: 'category_assosiations' });

UserRole.belongsToMany(User, { through: 'user_role_assosiations' });
User.belongsToMany(UserRole, { through: 'user_role_assosiations' });


export async function init(): Promise<void> {
    try {
        await sequelize.authenticate();
        logger.info("Database Connection has been established successfully.");
        await sequelize.sync({ force: true }); //force: true overrides table if model is different. 

        /*         
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
        */
        console.log("Database Connection has been established successfully.");
    } catch (error) {
        logger.error("init() failed with -->", error);
        console.log("Error Database Connection" + error);
    }
}