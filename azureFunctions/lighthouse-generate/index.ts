import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as lighthouse from 'lighthouse'
import { chromium } from 'playwright-chromium'

const browserPort = 9222

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const browswer = await chromium.launch({
    args: [`--remote-debugging-port=${browserPort}`],
  })
  const options = {logLevel: 'info', output: 'html', port: browserPort, throttling: {
    cpuSlowdownMultiplier: 2,
    rttMs: 0
  }}
  const result = await lighthouse(req.query.url, options)

  await browswer.close()

  context.res = {
    body: JSON.stringify({
      html: result.report,
      json: result.lhr
    }),
    headers: {
      'content-type': 'application/json'
    }
  }
}

export default httpTrigger