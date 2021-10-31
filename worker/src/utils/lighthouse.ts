const LIGHTHOUSE_ENDPOINT = process.env.lighthouse_endpoint!
const LIGHTHOUSE_CODE     = process.env.lighthouse_code!

interface LighthouseReport {
  html: string
  json: Record<string, any>
}

export const generateLighthouseReport = async (url: string) => {
  const lighthouseURL = new URL(LIGHTHOUSE_ENDPOINT)
  lighthouseURL.searchParams.set('code', LIGHTHOUSE_CODE)
  lighthouseURL.searchParams.set('url', url)

  const res = await fetch(lighthouseURL.toString())

  return res.json<LighthouseReport>()
}
