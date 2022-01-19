"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSampleData = exports.init = exports.OrderedItem = exports.Order = exports.MenuItem = exports.Allergens = exports.MenuCategory = exports.OrderItemStatus = exports.OrderStatus = exports.Table = exports.User = exports.UserRole = exports.MenuItemStatus = void 0;
const sequelize_1 = require("sequelize");
const Logger_1 = require("./Logger");
const sample = __importStar(require("./sampledata"));
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `localhost:${PORT}`;
const logger = Logger_1.dblogger;
function log(sql, timing) {
    logger.log("info", sql);
    return true;
}
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mariadb",
    host: DB_HOST,
    port: DB_PORT,
    logging: true, //logging: log,
});
class MenuItemStatus extends sequelize_1.Model {
}
exports.MenuItemStatus = MenuItemStatus;
MenuItemStatus.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: "menuitem_status",
    sequelize,
});
class UserRole extends sequelize_1.Model {
}
exports.UserRole = UserRole;
UserRole.init({
    roleID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: "user_role",
    sequelize,
});
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    userID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
}, {
    tableName: "user",
    sequelize,
});
class Table extends sequelize_1.Model {
}
exports.Table = Table;
Table.init({
    tableID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    anzahlPlatz: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 2
    },
    beschreibung: {
        type: sequelize_1.DataTypes.STRING(30),
    }
}, {
    tableName: "table",
    sequelize,
});
class OrderStatus extends sequelize_1.Model {
}
exports.OrderStatus = OrderStatus;
OrderStatus.init({
    orderStatusID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    tableName: "order_status",
    sequelize,
});
class OrderItemStatus extends sequelize_1.Model {
}
exports.OrderItemStatus = OrderItemStatus;
OrderItemStatus.init({
    orderItemStatusID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    tableName: "orderitem_status",
    sequelize,
});
class MenuCategory extends sequelize_1.Model {
}
exports.MenuCategory = MenuCategory;
MenuCategory.init({
    categoryID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(30), allowNull: false
    },
    desc: {
        type: sequelize_1.DataTypes.STRING(500), allowNull: false
    }
}, {
    tableName: "menu_category",
    sequelize,
});
class Allergens extends sequelize_1.Model {
}
exports.Allergens = Allergens;
Allergens.init({
    allergenID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30), allowNull: false
    }
}, {
    tableName: "allergen",
    sequelize,
});
class MenuItem extends sequelize_1.Model {
}
exports.MenuItem = MenuItem;
MenuItem.init({
    itemID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(200), allowNull: false
    },
    desc: {
        type: sequelize_1.DataTypes.STRING(1000), allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE, allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false
    }
}, {
    tableName: "menu_item",
    sequelize,
});
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    orderID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    orderStatusID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: OrderStatus,
            key: "orderStatusID",
        }
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    tableID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Table,
            key: "tableID",
        }
    },
    paymentReference: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    paymentToken: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    totalAmount: { type: sequelize_1.DataTypes.DOUBLE, allowNull: false },
}, {
    tableName: "order",
    sequelize,
});
class OrderedItem extends sequelize_1.Model {
}
exports.OrderedItem = OrderedItem;
OrderedItem.init({
    orderID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Order,
            key: "orderID",
        },
    },
    itemID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: MenuItem,
            key: "itemID",
        }
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    orderItemSatusID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: OrderItemStatus,
            key: "orderItemStatusID",
        }
    },
}, {
    tableName: "ordered_item",
    sequelize,
});
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
async function init() {
    try {
        await sequelize.authenticate();
        logger.info("Database Connection has been established successfully.");
        await sequelize.sync({ force: true }); //force: true overrides table if model is different.
        logger.info("Database initialized");
        uploadSampleData();
        console.log("Database initialized.");
    }
    catch (error) {
        logger.error("init() failed with -->", error);
        console.log("Error Database Connection" + error);
    }
}
exports.init = init;
// ----------------------- Sample Data import -------------------------------------
async function uploadSampleData() {
    let u;
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
exports.uploadSampleData = uploadSampleData;
//# sourceMappingURL=database.js.map