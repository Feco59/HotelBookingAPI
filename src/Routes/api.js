import express from "express";
import cors from 'cors';
import veryfiToken from "../Middleware/auth.js";

import { UserController } from "../Controllers/UserController.js";
import { RoomController } from "../Controllers/RoomController.js";
import { BookingController } from "../Controllers/BookingController.js";

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter.post('/api/user',UserController.UserRegistration);
apiRouter.post('/api/user/auth',UserController.UserLogin);

apiRouter.get('/api/room',RoomController.getAvailableRooms);

apiRouter.use(veryfiToken);

apiRouter.post('/api/book',BookingController.RoomBooking);
apiRouter.put('/api/book',BookingController.DeleteBooking);
apiRouter.get('/api/book',BookingController.History);


export default apiRouter