import authRouter from '@/routes/auth'
import indexRouter from '@/routes/index'
import staffRouter from '@/routes/staff'

export default function (app) {
  app.use('/', indexRouter)
  app.use('/auth', authRouter)
  app.use('/staffs', staffRouter)
}
