import { Router } from 'express';
import { AdminController } from '@src/controllers';

const router: Router = Router();

router.post('/login', AdminController.login);

export default router;
