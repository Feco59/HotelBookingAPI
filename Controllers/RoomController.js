import { RoomService } from "../Services/RoomService.js"

export const RoomController = {
  getAvailableRooms: async (req,res) => {
    try {
      const filters = req.query
      const rooms = await RoomService.getAvailableRooms(filters);
      res.status(200).send(rooms)
    } catch (e) {
      res.status(e.errCode).send(e.message)
    }
  },
  RoomBooking: async(req,res) => {
    try {
      const bookingData = req.body;
      const bookingDetails = await RoomService.RoomBooking(bookingData);
      res.status(200).send(bookingDetails)
    } catch(e) {
      res.status(e.errCode).send(e.message)
    }
  },
  DeleteBooking: async(req,res) => {
    try {
      
      const bookingData = req.body.bookingid;
      const userId = req.userId
      const deleteResult = await RoomService.DeleteBooking(bookingData,userId);
      res.status(200).send(deleteResult)
    } catch(e) {
      
      res.status(e.statusCode).send(e.message)
    }
  }

}