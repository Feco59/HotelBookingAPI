export default (sequelize, Sequelize) => {
  const Bookings = sequelize.define("Bookings", {
    bookingid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roomid: {
      type: Sequelize.STRING
    },
    guestid: {
      type: Sequelize.STRING
    },
    checkin: {
      type: Sequelize.DATE
    },
    checkout: {
      type: Sequelize.DATE
    },
    price: {
      type: Sequelize.INTEGER
    },
    isDeleted: {
      type: Sequelize.INTEGER
    },
 
  });

  return Bookings;
};