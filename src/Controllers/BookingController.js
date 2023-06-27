import { BookingService } from "../Services/BookingService.js";

export const BookingController = {
  RoomBooking: async (req, res) => {
    try {
      const bookingData = req.body;
      const userId = req.userId;
      const bookingDetails = await BookingService.RoomBooking(bookingData, userId);

      res.status(200).send(bookingDetails);
    } catch (e) {
      if(!e.errCode) {
        res.send(500).send('Server Error');
      }
      res.status(e.statusCode).send(e.message);
    }
  },
  DeleteBooking: async (req, res) => {

    try {
      const bookingData = req.body.bookingid;
      const userId = req.userId;
      const deleteResult = await BookingService.DeleteBooking(bookingData, userId);

      res.status(200).send(deleteResult);
    } catch (e) {
      if(!e.errCode) {
        res.send(500).send('Server Error');
      }
      res.status(e.statusCode).send(e.message);
    }
  },
  History: async (req, res) => {
    try {

      const userId = req.userId;
      const HistoryData = await BookingService.BookingHistory(userId);

      res.status(200).send(HistoryData);
    } catch (e) {
      if(!e.errCode) {
        res.send(500).send('Server Error');
      }
      res.status(e.statusCode).send(e.message);
    }
  }
}