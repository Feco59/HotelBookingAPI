export default (sequelize, Sequelize) => {
  const Hotel = sequelize.define("Hotel", {
    hotelid: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
  });

  return Hotel;
};