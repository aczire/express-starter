import createError from 'http-errors'

import db from '@/database'
import redisClient from '@/libs/redis'

/**
 * POST /staffs
 * Create staff request
 */
export const createStaff = async (req, res, next) => {
  try {
    const { id: userId } = req.user

    // Create staff
    const staffData = { ...req.body, userId }
    const staff = await db.models.staff.create(staffData, {
      fields: ['userId', 'staff']
    })

    // Save this staff to redis
    if (redisClient.connected) {
      redisClient.set(`Staff:${staff.id}`, JSON.stringify(staff))
    }
    return res.status(201).json(staff)
  } catch (err) {
    return next(err)
  }
}

/**
 * GET /staffs
 * List staffs with pagination
 */
export const getStaffs = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query
    const offset = page * perPage - perPage

    const staffListResponse = await db.models.staff.findAndCountAll({
      offset,
      limit: perPage,
      include: {
        model: db.models.user,
        attributes: ['id', 'firstName', 'lastName']
      },
      order: [['createdAt', 'DESC']]
    })

    if (redisClient.connected) {
      staffListResponse.rows.forEach(staff => {
        redisClient.set(`Staff:${staff.id}`, JSON.stringify(staff))
      })
    }

    const totalPage = Math.ceil(staffListResponse.count / perPage)
    const response = {
      ...staffListResponse,
      page,
      totalPage,
      perPage
    }
    return res.json(response)
  } catch (err) {
    return next(err)
  }
}

/**
 * GET /staffs/:id
 * Get staff by id
 */
export const getStaffById = async (req, res, next) => {
  try {
    const { id: staffId } = req.params

    const staff = await db.models.staff.findOne({
      where: { id: staffId },
      include: {
        model: db.models.user,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
    if (!staff) {
      return next(createError(404, 'There is no staff with this id!'))
    }

    // Save this staff to redis
    if (redisClient.connected) {
      redisClient.set(req.cacheName, JSON.stringify(staff))
    }
    return res.status(200).json(staff)
  } catch (err) {
    return next(err)
  }
}

/**
 * DELETE /staffs/:id
 * Delete staff request
 */
export const deleteStaff = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { id: staffId } = req.params

    const staff = await db.models.staff.findOne({ where: { id: staffId, userId } })
    if (!staff) {
      return next(createError(404, 'There is no staff with this id!'))
    }

    // Remove this staff from redis, if exist
    if (redisClient.connected) {
      redisClient.del(`Staff:${staffId}`)
    }
    await staff.destroy()
    return res.status(204).send()
  } catch (err) {
    return next(err)
  }
}
