import { Router } from 'itty-router'
import measuremeantCountHandler from './measurements/count'
import getMeasurementHandler from './measurements/get'
import newMeasurementHandler from './measurements/new'

export const measurementsRouter = Router({
  base: '/api/measurements'
})

measurementsRouter.post('/new', newMeasurementHandler)
measurementsRouter.get('/get', getMeasurementHandler)
measurementsRouter.get('/count', measuremeantCountHandler)
