import '../core/styles/index.css'
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz'
import LoginForm from 'app/auth/components/LoginForm'
import { RecoilRoot } from 'recoil'

import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <ChakraProvider>
      <ChakraProvider>
        <RecoilRoot>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </RecoilRoot>
      </ChakraProvider>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title='Sorry, you are not authorized to access this'
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
