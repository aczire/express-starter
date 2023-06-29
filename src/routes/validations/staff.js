import { body, query } from 'express-validator'

export const listStaffsRules = [query('page').optional().isInt().toInt(), query('perPage').optional().isInt().toInt()]

export const createStaffRules = [body('staff').isLength({ max: 140 }).exists()]
