import { useRouter } from 'next/dist/client/router'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

export interface Context {
  currentMeasurement: Record<string, any>
  currentHTMLReport: string
  currentURL: string
  isFetching: boolean
  createMeasurement(url: string): Promise<void>
  getMeasurement(reportId: string): Promise<void>
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'https://perf.snoozing.dev'

const LighthouseContext = createContext<Context>({} as Context);
export default function useLighthouseContext(): Context {
  return useContext(LighthouseContext ?? ({} as Context))
}

export function LighthouseProvider({children}: PropsWithChildren<unknown>) {
  const [currentMeasurement, setMeasurement] = useState({})
  const [currentHTMLReport, setHTMLReport]   = useState('')
  const [isFetching, setFetching]            = useState(false)
  const [currentURL, setURL]                 = useState<string>('')
  const router                               = useRouter()

  const getMeasurement = async (reportId: string) => {
    setFetching(true)

    const res  = await fetch(`${API_HOST}/api/measurements/get?id=${reportId}`)
    const body = await res.json()
  
    setMeasurement(body.json)
    setHTMLReport(body.html)
    setURL(body.json.requestedUrl)
    setFetching(false)
  }

  const createMeasurement = async (url: string) => {
    setFetching(true)
    const res = await fetch(`${API_HOST}/api/measurements/new`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        url,
      })
    })
    const body = await res.json()

    setMeasurement(body.json)
    setHTMLReport(body.html)

    setURL(url)
    router.push(`/?report=${body.report_id}`, undefined, { shallow: true })
    setFetching(false)
  }

  return (
    <LighthouseContext.Provider
      value={{
        currentMeasurement,
        getMeasurement,
        currentHTMLReport,
        currentURL,
        isFetching,
        createMeasurement
      }}
    >
      {children}
    </LighthouseContext.Provider>
  )
}
