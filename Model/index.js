import {Sequelize} from "sequelize";
import sequelize from "../Config/database.js";
import user from "./user.js";
import Bookings from "./Bookings.js";
import Hotel from "./Hotel.js";
import Room from "./Room.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize,Sequelize);
db.hotel = Hotel(sequelize,Sequelize);
db.room = Room(sequelize,Sequelize);
db.bookings = Bookings(sequelize,Sequelize);

db.hotel.hasMany(db.room, {foreignKey: 'HotelID'});
db.room.belongsTo(db.hotel,{foreignKey: 'HotelID'});

export default db;