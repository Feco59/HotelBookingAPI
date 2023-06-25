import express from "express";
import cors from 'cors'
import veryfiToken from "../Middleware/auth.js";

import { UserController } from "../Controllers/UserController.js";
import { RoomController } from "../Controllers/RoomController.js";

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter.post('/api/user/auth',UserController.UserLogin);
apiRouter.get('/api/room',RoomController.getAvailableRooms)


apiRouter.get('api/room',RoomController.getAvailableRooms)
apiRouter.use(veryfiToken);

apiRouter.post('/api/book',RoomController.RoomBooking);
apiRouter.put('/api/book',RoomController.DeleteBooking);
//apiRouter.get('/api/book',RoomController)


export default apiRouter