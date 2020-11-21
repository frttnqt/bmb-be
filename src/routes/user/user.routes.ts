import { Router } from 'express';
import { UserController } from '@src/controllers';
import { auth } from "@src/routes/middlewares/auth.middleware";

const router: Router = Router();

router.post('', auth, UserController.addUser);
router.post('/bulk', auth, UserController.addUserList);
router.get('/list', UserController.getUserListMap);
router.get('/', auth, UserController.getUserList);
router.delete('/:id', auth, UserController.deleteUser);

export default router;
