import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'
import { Box, Link as ChakraLink } from '@chakra-ui/react'

type LoginFormProps = {
  title?: string
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Form
      submitText='Login'
      schema={Login}
      initialValues={{ email: '', password: '' }}
      onSubmit={async values => {
        try {
          const user = await loginMutation(values)
          props.onSuccess?.(user)
        } catch (error: any) {
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
          } else {
            return {
              [FORM_ERROR]:
                'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
            }
          }
        }
      }}
    >
      <LabeledTextField name='email' label='Email' placeholder='Email' />
      <LabeledTextField name='password' label='Password' placeholder='Password' type='password' />
      <Box w='100%'>
        <Link href={Routes.ForgotPasswordPage()} passHref>
          <ChakraLink>Forgot your password?</ChakraLink>
        </Link>
      </Box>
    </Form>
  )
}

export default LoginForm
