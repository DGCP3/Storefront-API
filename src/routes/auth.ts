import { createAccount, login, logout } from 'controllers/auth'
import { Router } from 'express'
import { requestValidator } from 'middleware'
import { loginSchema, registrationSchema } from 'schema'

const router = Router()
// auth & registration routes
router.route('/login').post(requestValidator(loginSchema), login)
router.route('/register').post(requestValidator(registrationSchema), createAccount)
router.route('/logout').get(logout)

export default router
