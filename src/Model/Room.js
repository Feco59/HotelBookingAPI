export default (sequelize, Sequelize) => {
  const HotelRooms = sequelize.define("HotelRooms", {
    RoomID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Price: {
      type: Sequelize.INTEGER
    },
    HotelID: {
      type: Sequelize.INTEGER
    }
  });

  return HotelRooms;
};