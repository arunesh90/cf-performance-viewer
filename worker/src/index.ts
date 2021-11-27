import { Router } from 'itty-router'
import { measurementsRouter } from './routes/measurements'

const rootRouter = Router()
const apiRouter = Router({base: '/api'})

rootRouter.all('/api/*', apiRouter.handle)

apiRouter.all('/measurements/*', measurementsRouter.handle)

rootRouter.options('*', () => {
  return new Response('OK')
})

rootRouter.all('*', () => {
  return new Response('Not Found', {
    status: 404
  })
})

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(rootRouter.handle(event.request, event).then((response: Response) => {
    response.headers.set('access-control-allow-origin', '*')
    response.headers.set('access-control-max-age', '86400')
    response.headers.set('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept')

    return response
  }))
})
