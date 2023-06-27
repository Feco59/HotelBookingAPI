import db from "../Model/index.js";
import { literal } from "sequelize";
import { BookingError, error } from "./statusService.js";
import { differenceInDays } from "date-fns";

const Bookings = db.bookings;

export const BookingService = {
  RoomBooking: async (data, userid) => {

    const { checkin, checkout, roomid, price } = data;

    const bookings = await Bookings.findAll({
      where: literal(`(checkin BETWEEN DATE(:CHECKIN) AND DATE(:CHECKOUT) OR checkout BETWEEN DATE(:CHECKIN) AND DATE(:CHECKOUT)) AND isDeleted <> 1 AND roomid = :ROOMID`),
      replacements: { CHECKIN: checkin, CHECKOUT: checkout, ROOMID: Number(roomid) }
    })

    if (bookings.length) {
      throw BookingError(error.ROOM_ALREADY_BOOKED)
    }

    if (new Date(checkin) > new Date(checkout)) {
      throw BookingError(error.USER_ERROR, 'Checkout is earlier than checkin')
    }

    if (new Date(checkin) < new Date()) {
      throw BookingError(error.USER_ERROR, 'Cannot book room in the past')
    }

    const days = differenceInDays(new Date(checkout), new Date(checkin));
    const fullBookingPrice = days * Number(price);

    const BookingData = {
      roomid: Number(roomid),
      guestid: Number(userid),
      checkin: new Date(checkin),
      checkout: new Date(checkout),
      price: fullBookingPrice
    };

    await Bookings.create(BookingData);
    return BookingData
  },
  DeleteBooking: async (bookingid, userid) => {

    const booking = await Bookings.findByPk(Number(bookingid));

    if (!booking || booking.isDeleted === 1) {
      throw BookingError(error.NOT_FOUND, 'Booking')
    }

    if (booking.guestid !== Number(userid)) {
      throw BookingError(error.FORBIDDEN_ACTION)
    }

    if (new Date(booking.checkin) <= new Date()) {
      throw BookingError(error.USER_ERROR, 'You cannot delete booking on checkin day')
    }

    booking.isDeleted = 1;
    await booking.save();

    return booking;
  },
  BookingHistory: async userid => {
    const History = await Bookings.findAll({
      where: {
        guestid: userid
      }
    })
    return History;
  }
}