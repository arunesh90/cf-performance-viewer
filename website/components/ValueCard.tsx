import {
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'

interface ValueCardProps {
  title: string
  audit: any
}

const backgroundTransparency = 0.75
const backgroundColors = {
  red: `rgba(255,0,0, ${backgroundTransparency})`,
  green: `rgba(0,255,0, ${backgroundTransparency})`,
  orange: `rgba(255,128,0,${backgroundTransparency})`
}

const getColor = (score: number) => {
  if (score >= 0.80) {
    return 'green'
  } else if (score >= 0.60) {
    return 'orange'
  } else {
    return 'red'
  }
}

export default function ValueCard(props: ValueCardProps) {
  const { title, audit } = props
  const color = getColor(audit.score)

  return (
    <Stat
      mt='10px'
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue(`${color}.800`, `${color}.500`)}
      rounded={'lg'}
      minWidth='14rem'
      style={{
        backgroundColor: backgroundColors[color]
      }}
    >
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {audit.displayValue}
      </StatNumber>
    </Stat>
  )
}