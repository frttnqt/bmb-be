import { Router } from 'express';

import UserRouter from './user';
import AdminRouter from './admin';

const router = Router();

router.use('/user', UserRouter);
router.use('/admin', AdminRouter);

export default router;
