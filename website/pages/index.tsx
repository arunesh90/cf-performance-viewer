import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Input,
  Button,
  Box
} from '@chakra-ui/react'
import Background from '../components/background'
import { FormEvent, useEffect, useRef } from 'react'
import useLighthouseContext from '../context/Lighthouse'
import LighthouseReport from '../components/LighthouseReport'
import { useRouter } from 'next/dist/client/router'
import GitHubRibbon from 'react-github-ribbons'

const Home: NextPage = () => {
  const router                                                        = useRouter()
  const inputRef                                                      = useRef<HTMLInputElement>(null)
  const { currentURL, isFetching, createMeasurement, getMeasurement } = useLighthouseContext()

  const submitCheck = (event: FormEvent) => {
    event.preventDefault()
    createMeasurement(inputRef.current!.value)
  }

  useEffect(() => {
    const reportId = router.query.report as string
    
    if (reportId) {
      getMeasurement(reportId)
    }
  }, [router.query.report])

  return (
    <>
      <Head>
        <title>Performance Viewer</title>
      </Head>

      <GitHubRibbon href="https://github.com/arunesh90/cf-performance-viewer" />

      <Box
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          maxWidth: '100vw'
        }}
      >
        <Background />
        <Container maxWidth='1600px'>
          <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Check the{' '}
              <Text as={'span'} color={'orange.400'}>
                performance{' '}
              </Text>
              of your website today!
            </Heading>
            <Text fontSize='3xl' color={'black'} maxW={'4xl'}>
              ⚡ Powered by Cloudflare Workers & Pages, Fauna and Azure ⚡
            </Text>
            <form onSubmit={(event) => submitCheck(event)} style={{
              width: '100%'
            }}>
              <Flex w={'full'}>
                <div style={{
                  display: 'flex',
                  width: '100%'
                }}>
                  <Input
                    isDisabled={isFetching}
                    type='url'
                    ref={inputRef}
                    placeholder='https://www.google.com'
                    style={{
                      height: '60px',
                      flexGrow: 1,
                      border: '1px solid orange',
                      borderRight: 0,
                      borderRadius: '22px 0px 0px 22px',
                      fontSize: '22px',
                      color: 'black',
                      backgroundColor: 'white',
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                    }}
                  />

                  <Button
                    isLoading={isFetching}
                    onClick={(event) => submitCheck(event)}
                    style={{
                      padding: '0px 20px',
                      flexGrow: 0,
                      border: 'solid orange 1px',
                      borderLeft: 0,
                      borderRadius: '0px 22px 22px 0px',
                      backgroundColor: 'orange',
                      height: '100%'
                    }}
                  >
                    ⚡
                  </Button>
                </div>
              </Flex>
            </form>
            
            {currentURL && <LighthouseReport />}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Home
