import { Router } from "express";
import {createQuery} from "../services/message.service";
import { MessageValidator} from "../validators/message.validator";

const router = Router();

// /api/message
// router.get('/', sendMessage);

// api/message
router.post('/', MessageValidator.createQueryValidation,createQuery);



// /api/message/123
// router.get('/:id')


// app.get('/query', (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.send('Hello, LawGPT!');
// }


export default router;