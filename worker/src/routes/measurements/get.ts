import { query as q } from 'faunadb'
import { fauna } from '../../fauna'
import { routeHandler } from '../../types/routeHandler'

const getMeasurementHandler: routeHandler = async (req) => {
  const parsedURL = new URL(req.url)
  const reportId  = parsedURL.searchParams.get('id')
  if (!reportId) {
    return new Response('Missing report ID', {
      status: 404
    })
  }

  const query = await fauna.query<any>(
    q.Get(
      q.Match(
        q.Index('report_id'),
        reportId
      )
    )
  )
  
  return new Response(JSON.stringify(query.data), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export default getMeasurementHandler
