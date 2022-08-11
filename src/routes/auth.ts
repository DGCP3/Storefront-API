import { createAccount, login, logout } from 'controllers/auth'
import { Router } from 'express'
import { requestValidator } from 'middleware'
import { accountSchema, loginSchema } from 'schema'
import { z } from 'zod'

const router = Router()
// auth & registration routes
router.route('/login').post(requestValidator(loginSchema), login)
router.route('/register').post(requestValidator(z.object({ body: accountSchema })), createAccount)
router.route('/logout').get(logout)

export default router
