
import { Association, DataTypes, HasManyGetAssociationsMixin, Model, Sequelize, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyHasAssociationMixin, Optional } from "sequelize";
import { dblogger } from "./Logger";
import * as sample from "./sampledata"

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


// ---- Model Definitions -------------
//---------------    MenuItem Status  ---------------------------------- 

export interface IMenuItemStatusDB {
    id: number;
    name: string;
}

interface IMenuItemStatusDBCreationAttributes extends Optional<IMenuItemStatusDB, "id"> { }

export class MenuItemStatus extends Model<IMenuItemStatusDB, IMenuItemStatusDBCreationAttributes> implements IMenuItemStatusDB {
    id!: number;
    name!: string;
}

MenuItemStatus.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },
    {
        tableName: "menuitem_status",
        sequelize,
    }
);

//---------------    User Role   ---------------------------------- 

export interface IUserRoleDB {
    roleID: number;
    name: String;
}

interface IUserRoleDBCreationAttributes extends Optional<IUserRoleDB, "roleID"> { }

export class UserRole extends Model<IUserRoleDB, IUserRoleDBCreationAttributes> implements IUserRoleDB {
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



//---------------    User   ---------------------------------- 

export interface IUserDB {
    userID: number;
    name: string;
    password: string;
}

interface IUserDBCreationAttributes extends Optional<IUserDB, "userID"> { }

export class User extends Model<IUserDB, IUserDBCreationAttributes> implements IUserDB {
    userID!: number;
    name!: string;
    password!: string;

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    declare getUserRole: HasManyGetAssociationsMixin<UserRole>; // Note the null assertions!
    declare addUserRole: HasManyAddAssociationMixin<UserRole[], number>;
    declare addUserRoles: HasManyAddAssociationMixin<UserRole[], number>;
    declare hasUserRole: HasManyHasAssociationMixin<UserRole[], number>;
    declare countUserRole: HasManyCountAssociationsMixin;
    declare createUserRole: HasManyCreateAssociationMixin<UserRole>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    declare readonly userroles?: UserRole[]; // Note this is optional since it's only populated when explicitly requested in code
    declare static associations: {
        userroles: Association<User, UserRole>;
    };
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


//---------------    Table  ---------------------------------- 
export interface ITableDB {
    tableID: number;
    anzahlPlatz: number;
    beschreibung: string | null; // optinal value
}
interface ITableDBCreationAttributes extends Optional<ITableDB, "tableID"> { }

export class Table extends Model<ITableDB, ITableDBCreationAttributes> implements ITableDB {
    tableID!: number;
    anzahlPlatz!: number;
    beschreibung!: string | null;
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
            defaultValue: 2
        },
        beschreibung: {
            type: DataTypes.STRING(30),
        }
    },
    {
        tableName: "table",
        sequelize,
    }
);


//---------------    Order Status   ---------------------------------- 

export interface IOrderStatusDB {
    orderStatusID: number;
    name: string;
}
export interface IOrderStatusCreationAttributes extends Optional<IOrderStatusDB, "orderStatusID"> { }

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


//---------------    Orderitem Status  ---------------------------------- 

export interface IOrderItemStatusDB {
    orderItemStatusID: number;
    name: string;
}
export interface IOrderItemStatusUserCreationAttributes extends Optional<IOrderItemStatusDB, "orderItemStatusID"> { }

export class OrderItemStatus extends Model<IOrderItemStatusDB, IOrderItemStatusUserCreationAttributes> implements IOrderItemStatusDB {
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




//---------------    Menu Category   ---------------------------------- 
export interface IMenuCategoryDB {
    categoryID: number;
    title: string;
    desc: string;
}
interface IMenuCategoryDBCreationAttributes extends Optional<IMenuCategoryDB, "categoryID"> { }

export class MenuCategory extends Model<IMenuCategoryDB, IMenuCategoryDBCreationAttributes> implements IMenuCategoryDB {
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

//---------------    Allergens   ---------------------------------- 
export interface IAllergensDB {
    allergenID: number;
    name: string;
}
interface IAllergensDBCreationAttributes extends Optional<IAllergensDB, "allergenID"> { }

export class Allergens extends Model<IAllergensDB, IAllergensDBCreationAttributes> implements IAllergensDB {
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



//---------------    Menu Item   ---------------------------------- 

export interface IMenuItemDB {
    itemID: number;
    title: string;
    desc: string;
    price: number;
    status: number;
}
interface IMenuItemDBCreationAttributes extends Optional<IMenuItemDB, "itemID"> { }

export class MenuItem extends Model<IMenuItemDB, IMenuItemDBCreationAttributes> implements IMenuItemDB {
    itemID!: number;
    title!: string;
    desc!: string;
    price!: number;
    status!: number;

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    declare getAllergens: HasManyGetAssociationsMixin<Allergens[]>; // Note the null assertions!
    declare addAllergens: HasManyAddAssociationMixin<Allergens[], number>;
    declare hasAllergens: HasManyHasAssociationMixin<Allergens, number>;
    declare countAllergens: HasManyCountAssociationsMixin;
    declare createAllergens: HasManyCreateAssociationMixin<Allergens>;

    declare getMenuCategory: HasManyGetAssociationsMixin<MenuCategory>; // Note the null assertions!
    declare addMenuCategories: HasManyAddAssociationMixin<MenuCategory[], number>;
    declare addMenuCategory: HasManyAddAssociationMixin<MenuCategory, number>
    declare hasMenuCategory: HasManyHasAssociationMixin<MenuCategory, number>;
    declare countMenuCategory: HasManyCountAssociationsMixin;
    declare createMenuCategory: HasManyCreateAssociationMixin<MenuCategory>;

    declare getMenuItemStauts: HasManyGetAssociationsMixin<MenuItemStatus>; // Note the null assertions!
    declare addMenuItemStatus: HasManyAddAssociationMixin<MenuItemStatus, number>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    declare readonly allergens?: Allergens[]; // Note this is optional since it's only populated when explicitly requested in code
    declare readonly menucategories?: MenuCategory[]; // Note this is optional since it's only populated when explicitly requested in code
    declare readonly menuitemstatus?: MenuItemStatus;

    declare static associations: {
        allergens: Association<MenuItem, Allergens>;
        menucategories: Association<MenuItem, MenuCategory>;
        menuitemstatus: Association<MenuItem, MenuItemStatus>;
    };
}

MenuItem.init(
    {
        itemID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(200), allowNull: false
        },
        desc: {
            type: DataTypes.STRING(1000), allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE, allowNull: false
        },
        status: {
            type: DataTypes.INTEGER.UNSIGNED, allowNull: false
        }
    },
    {
        tableName: "menu_item",
        sequelize,
    }
);


//---------------    Order   ---------------------------------- 

export interface IOrderDB {
    orderID: number;
    orderStatusID: number;
    orderDate: number;
    tableID: number;
    paymentReference: string;
    paymentToken: string;
    totalAmount: number;
}
export interface IOrderCreationAttributes extends Optional<IOrderDB, "orderID"> { }

export class Order
    extends Model<IOrderDB, IOrderCreationAttributes>
    implements IOrderDB {
    orderID!: number;
    orderStatusID!: number;
    orderDate!: number;
    tableID!: number;
    paymentReference!: string;
    paymentToken!: string;
    totalAmount!: number;

    declare getOrderedItems: HasManyGetAssociationsMixin<OrderedItem>; // Note the null assertions!
    declare addOrderedItems: HasManyAddAssociationMixin<OrderedItem[], number>;
    declare hasOrderedItems: HasManyHasAssociationMixin<OrderedItem[], number>;
    declare countOrderedItems: HasManyCountAssociationsMixin;
    declare createOrderedItems: HasManyCreateAssociationMixin<OrderedItem>;

    declare getOrderStatus: HasManyGetAssociationsMixin<OrderStatus>; // Note the null assertions!
    declare addOrderStatus: HasManyAddAssociationMixin<OrderStatus, number>;
    declare getTable: HasManyGetAssociationsMixin<Table>;
    declare addTable: HasManyAddAssociationMixin<Table, number>;

    declare readonly ordereditems?: Allergens[];
    declare readonly orderstatus?: OrderStatus;
    declare readonly table?: Table;
    declare static associations: {
        ordereditems: Association<Order, OrderedItem>;
        orderstatus: Association<Order, OrderStatus>;
        table: Association<Order, Table>;
    };

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


//---------------    Ordered Item   ---------------------------------- 

export interface IOrderedItemDB {
    orderID: number;
    itemID: number;
    number: number;
    orderItemSatusID: number;
}

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



//------------ Assosiation Tables ---------------------------------

MenuItem.belongsToMany(Allergens, { through: 'allergen_assosiations' });
Allergens.belongsToMany(MenuItem, { through: 'allergen_assosiations' });

MenuItem.belongsToMany(MenuCategory, { through: 'category_assosiations' });
MenuCategory.belongsToMany(MenuItem, { through: 'category_assosiations' });

UserRole.belongsToMany(User, { through: 'user_role_assosiations' });
User.belongsToMany(UserRole, { through: 'user_role_assosiations' });

Order.hasMany(OrderedItem, {
    sourceKey: "orderID",
    foreignKey: "orderID",
});

Order.hasOne(OrderStatus, {
    sourceKey: "orderStatusID",
    foreignKey: "orderStatusID",
    constraints: false
});

Order.hasOne(Table, {
    sourceKey: "tableID",
    foreignKey: "tableID",
    constraints: false
});

MenuItem.hasOne(MenuItemStatus, {
    sourceKey: "status",
    foreignKey: "id",
    constraints: false
});


//----------------- Initialize Model ---------------------------

export async function init(): Promise<void> {
    try {
        await sequelize.authenticate();
        logger.info("Database Connection has been established successfully.");
        await sequelize.sync({ force: true }); //force: true overrides table if model is different. 
        logger.info("Database initialized");
        uploadSampleData();
        console.log("Database initialized.");

    } catch (error) {
        logger.error("init() failed with -->", error);
        console.log("Error Database Connection" + error);
    }
}


// ----------------------- Sample Data import -------------------------------------

export async function uploadSampleData(): Promise<void> {
    let u: number;

    await OrderItemStatus.bulkCreate(sample.SamplesOrderItemStatus, { returning: false });
    await OrderStatus.bulkCreate(sample.SamplesOrderStatus, { returning: false });
    await Table.bulkCreate(sample.SamplesTable, { returning: false });
    await MenuItemStatus.bulkCreate(sample.SamplesMenuItemStatus, { returning: false });
    let menucategories = await MenuCategory.bulkCreate(sample.SamplesMenuCategory, { returning: true });
    let allergens = await Allergens.bulkCreate(sample.SampleAllergens, { returning: true });
    let menuItems = await MenuItem.bulkCreate(sample.SampleMenuItems, { returning: true });

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addAllergens(allergens);
        u = Math.floor(Math.random() * 2);
        menuItems[i].addMenuCategories([menucategories[u], menucategories[u + 1],]);
    }

    let userroles = await UserRole.bulkCreate(sample.SamplesUserRole, { returning: true });
    let newUsers = await User.bulkCreate(sample.SampleUser, { returning: true });

    for (let i = 0; i < newUsers.length; i++) {
        u = Math.floor(Math.random() * userroles.length);
        newUsers[i].addUserRoles([userroles[u]]);
    }

    await Order.bulkCreate(sample.SampleOrders, { returning: true });
    await OrderedItem.bulkCreate(sample.SampleOrderedItem, { returning: true });
}
