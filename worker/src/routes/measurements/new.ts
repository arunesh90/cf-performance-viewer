import { routeHandler } from '../../types/routeHandler'
import { generateLighthouseReport } from '../../utils/lighthouse'
import { uuidV4 } from '../../utils/uuid'

interface NewMeasurementBody {
  url: string
}

const newMeasurementHandler: routeHandler = async (req) => {
  const contentType = req.headers.get('content-type')
  if (contentType?.toLowerCase() !== 'application/json') {
    return new Response('Invalid request', {
      status: 400
    })
  }

  const body = await req.json<NewMeasurementBody>()
  if (!body.url) {
    return new Response('Missing URL', {
      status: 400
    })
  }

  // URL Checking
  const lighthouseReport = await generateLighthouseReport(body.url)
  const reportId         = uuidV4()

  // Save report to KV Store
  await LIGHTHOUSE_REPORTS.put(`report-${reportId}`, JSON.stringify({
    html: lighthouseReport.html,
    json: lighthouseReport.json
  }))

  return new Response(JSON.stringify({
    report_id: reportId,
    html     : lighthouseReport.html,
    json     : lighthouseReport.json
  }), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export default newMeasurementHandler
