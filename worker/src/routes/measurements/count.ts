import { routeHandler } from '../../types/routeHandler'

const measuremeantCountHandler: routeHandler = async () => {
  const list = await LIGHTHOUSE_REPORTS.list()

  return new Response(JSON.stringify({
    count: list.keys.length
  }), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export default measuremeantCountHandler
