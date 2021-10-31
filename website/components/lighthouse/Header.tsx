import { Flex } from '@chakra-ui/layout'
import useLighthouseContext from '../../context/Lighthouse'
import ValueCard from '../ValueCard'

export default function LighthouseHeader () {
  const { currentMeasurement } = useLighthouseContext()
  const { audits }             = currentMeasurement

  const fcp         = audits['first-contentful-paint']
  const interactive = audits['interactive']
  const speed       = audits['speed-index']
  const lcp         = audits['largest-contentful-paint']
  const cls         = audits['cumulative-layout-shift']

  return (
    <Flex
      style={{
        gap: '5%',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      <ValueCard title='First Contentful Paint' audit={fcp} />
      <ValueCard title='Time to Interactive' audit={interactive} />
      <ValueCard title='Speed Index' audit={speed} />
      <ValueCard title='Largest Contentful Paint' audit={lcp} />
      <ValueCard title='Cumulative Layout Shift' audit={cls} />
    </Flex>
  )
}
