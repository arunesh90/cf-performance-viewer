import { border } from '@chakra-ui/styled-system'
import useLighthouseContext from '../context/Lighthouse'
import LighthouseHeader from './lighthouse/Header'

export default function LighthouseReport() {
  const { currentHTMLReport } = useLighthouseContext()

  return (
    <>
      <LighthouseHeader />

      <iframe
        style={{
          marginTop: '3rem',
          borderRadius: '15px'
        }}
        width='100%'
        height='650'
        srcDoc={currentHTMLReport}
      />
    </>
  )
}
