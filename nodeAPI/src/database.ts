
import { Association, DataTypes, HasManyGetAssociationsMixin, Model, Sequelize, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyHasAssociationMixin } from "sequelize";
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
    logging: false, //logging: log,
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
    status: number;
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

export interface IMenuItemStatusDB {
    id: number;
    name: string;
}

export class MenuItemStatus extends Model<IMenuItemStatusDB> implements IMenuItemStatusDB {
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

export class User extends Model<IUserDB> implements IUserDB {
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
    status!: number;

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    declare getAllergens: HasManyGetAssociationsMixin<Allergens>; // Note the null assertions!
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

    declare getOrderedItems: HasManyGetAssociationsMixin<OrderedItem>; // Note the null assertions!
    declare addOrderedItems: HasManyAddAssociationMixin<OrderedItem[], number>;
    declare hasOrderedItems: HasManyHasAssociationMixin<OrderedItem[], number>;
    declare countOrderedItems: HasManyCountAssociationsMixin;
    declare createOrderedItem: HasManyCreateAssociationMixin<OrderedItem>;

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

Order.hasMany(OrderedItem, {
    sourceKey: "orderID",
    foreignKey: "orderID"
});

Order.hasOne(OrderStatus, {
    sourceKey: "orderStatusID",
    foreignKey: "orderStatusID"
});

Order.hasOne(Table, {
    sourceKey: "tableID",
    foreignKey: "tableID"
});

MenuItem.hasOne(MenuItemStatus, {
    sourceKey: "status",
    foreignKey: "id"
});



export async function init(): Promise<void> {
    try {
        await sequelize.authenticate();
        logger.info("Database Connection has been established successfully.");
        await sequelize.sync({ force: true }); //force: true overrides table if model is different. 
        uploadSampleData();
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
