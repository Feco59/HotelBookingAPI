import { literal,Op } from "sequelize";
import db from "../Model/index.js";
import { differenceInDays } from "date-fns";


const Hotel = db.hotel;
const Bookings = db.bookings;
const Room = db.room;

export const RoomService = {
  getAvailableRooms: async filters => {

    try {
      const {checkin,checkout,price,available} = filters
      const rooms = await RoomService.getAllRooms();


      const RoomsData = rooms.map(room => {
        const RoomData = {
          RoomID: room.RoomID,
          Price: room.Price,
          hotelid: room.dataValues.hotelid,
          HotelName: room.Hotel.name
        };
        return RoomData
      })

      if(Object.keys(filters).length === 0) {
        return RoomsData
      };

      let filteredRooms;

      if(checkin && checkout) {
        const days = differenceInDays(new Date(checkout), new Date(checkin));
        filteredRooms = RoomsData.map(room => ({...room,fullPrice: room.Price * days}))
      }
      
      if (available) {
        const BookingsData = await RoomService.getRoomsByAvailable(checkin,checkout);
        const BookedRooms = new Set(BookingsData.map(e => e.roomid));
        
        if (filteredRooms) {
          filteredRooms = filteredRooms.filter(e => !BookedRooms.has(e.RoomID))
        } else {
          filteredRooms = RoomsData.filter(e => !BookedRooms.has(e.RoomID))
        }
      }

      if (price) {
        if (filteredRooms) {
          filteredRooms = filteredRooms.filter(e => e.Price <= Number(price))
        } else {
          filteredRooms = RoomsData.filter(e => e.Price <= Number(price))
        }
      }
      
      return filteredRooms;
    } catch (e) {
      console.log(e)
      return e
    }
  },
  getAllRooms: async _ => {
    const rooms = Room.findAll({
      attributes: ['RoomID', 'Price', 'hotelid'],
      include: {
        model: Hotel,
        attributes: ['name']
      }
    });
    return rooms  
  },
  getRoomsByAvailable: async (checkin,checkout) => {
    const bookings = await Bookings.findAll({
      where: literal(`checkin BETWEEN DATE(:CHECKIN) AND DATE(:CHECKOUT) OR checkout BETWEEN DATE(:CHECKIN) AND DATE(:CHECKOUT) AND isDeleted <> 1`),
      replacements: { CHECKIN: checkin, CHECKOUT: checkout }
    });

    return bookings
  },
  getRoomsByPrice: async price => {
    const RoomsByPrice = await Room.findAll({
      where: {
        price: {
          [Op.gte]: price
        }
      }
    })

    return RoomsByPrice;
  }
}