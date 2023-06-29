import { Router } from 'express'

import * as staffController from '@/controllers/staff'
import * as staffValidations from '@/routes/validations/staff'
import { cache, isAuthenticated, validate } from '@/middleware'

const router = Router()

router
  .route('/')
  .get(isAuthenticated, validate(staffValidations.listStaffsRules), staffController.getStaffs)
  .post(isAuthenticated, validate(staffValidations.createStaffRules), staffController.createStaff)

router
  .route('/:id')
  .get(cache('Staff', 'req.params.id'), staffController.getStaffById)
  .delete(isAuthenticated, staffController.deleteStaff)

export default router
