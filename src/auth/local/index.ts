import { Router } from 'express';

import { loginHandler } from './local.controller';

const router = Router();

// POST -> /auth/local/login
router.post('/login', loginHandler);
//router.get('/activate/:token', (req, res) => {});
//router.patch('/forgot-password', (req, res) => {});

export default router;
