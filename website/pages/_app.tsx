import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { LighthouseProvider } from '../context/Lighthouse'

import '../styles/globals.css'

const queryClient = new QueryClient()

function PerformanceApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <LighthouseProvider>
          <Component {...pageProps} />
        </LighthouseProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default PerformanceApp
