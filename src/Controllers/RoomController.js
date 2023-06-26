import { RoomService } from "../Services/RoomService.js"

export const RoomController = {
  getAvailableRooms: async (req,res) => {
    try {
      const filters = req.query
      const rooms = await RoomService.getAvailableRooms(filters);
      res.status(200).send(rooms)
    } catch (e) {
      if(!e.errCode) {
        res.send(500).send('Server Error')
      }
      res.status(e.statusCode).send(e.message)
    }
  },
}