import { Router } from 'itty-router'

const router = Router()

router.get('/', () => {
  return new Response('test2')
})

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
