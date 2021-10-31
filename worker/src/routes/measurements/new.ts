import { query as q } from 'faunadb'
import { fauna } from '../../fauna'
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

  // Save report to Fauna
  await fauna.query(
    q.Create(
      q.Collection('lighthouse_reports'),
      {
        data: {
          report_id: reportId,
          html: lighthouseReport.html,
          json: lighthouseReport.json
        }
      }
    )
  )

  return new Response(JSON.stringify({html: lighthouseReport.html, json: lighthouseReport.json, report_id: reportId}), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export default newMeasurementHandler
