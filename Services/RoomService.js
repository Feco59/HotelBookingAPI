import { literal } from "sequelize";
import db from "../Model/index.js";
import { differenceInDays } from "date-fns";
import { BookingError, error } from "./statusService.js";

const Hotel = db.hotel;
const Bookings = db.bookings;
const Room = db.room;

export const RoomService = {
  getAvailableRooms: async filters => {

    try {
      let availableRooms;
      const data = await RoomService.getDataToAvailableRooms(filters);

      const BookingsData = data[1].map(booking => booking.roomid);
      const roomsData = data[0].map(room => {
        const RoomData = {
          RoomId: room.RoomID,
          price: room.Price,
          hotelId: room.dataValues.hotelid,
          hotelName: room.Hotel.dataValues.name
        }
        return RoomData;
      });

      if (filters.hotel) {
        availableRooms = roomsData.filter(e => e.hotelId === Number(filters.hotel))
      }

      if (filters.available) {
        if (availableRooms) {
          availableRooms = availableRooms.filter(e => !BookingsData.includes(e.RoomId))
        } else {
          availableRooms = roomsData.filter(e => !BookingsData.includes(e.RoomId))
        }
      }

      if (filters.price) {
        if (availableRooms) {
          availableRooms = availableRooms.filter(e => e.price <= Number(filters.price))
        } else {
          availableRooms = roomsData.filter(e => e.price <= Number(filters.price))
        }
      }

      return availableRooms;
    } catch (e) {
      console.log(e)
      return e
    }

  },
  getDataToAvailableRooms: async filters => {
    const { checkin, checkout } = filters

    const rooms = Room.findAll({
      attributes: ['RoomID', 'Price', 'hotelid'],
      include: {
        model: Hotel,
        attributes: ['name']
      }
    });

    const bookings = Bookings.findAll({
      where: literal(`checkin BETWEEN DATE(:CHECKIN) AND DATE(:CHECKOUT) OR checkout BETWEEN DATE(:CHECKIN) AND DATE(:CHECKOUT)`),
      replacements: { CHECKIN: checkin, CHECKOUT: checkout }
    });

    return Promise.all([rooms, bookings]);
  },
  RoomBooking: async (data,userid) => {

    const { checkin, checkout, roomid, price } = data;

    const days = differenceInDays(new Date(checkout), new Date(checkin));

    const fullPrice = days * price;



  },
  DeleteBooking: async (bookingid, userid) => {

    const booking = await Bookings.findByPk(Number(bookingid));
    
    if (!booking) {
      throw  BookingError(error.NOT_FOUND, 'Booking')
    }

    if (booking.guestid !== Number(userid)) {
      throw  BookingError(error.FORBIDDEN_ACTION)
    }

    if (new Date(booking.checkin) <= new Date()) {
      throw  BookingError(error.USER_ERROR)
    }

    booking.isDeleted = 1;
    await booking.save();

    return booking;
  }
}