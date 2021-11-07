import { routeHandler } from '../../types/routeHandler'

const getMeasurementHandler: routeHandler = async (req) => {
  const parsedURL = new URL(req.url)
  const reportId  = parsedURL.searchParams.get('id')
  if (!reportId) {
    return new Response('Missing report ID', {
      status: 404
    })
  }

  const report = await LIGHTHOUSE_REPORTS.get(`report-${reportId}`)
  
  return new Response(report, {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export default getMeasurementHandler
