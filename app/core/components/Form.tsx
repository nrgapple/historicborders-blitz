import { useState, ReactNode, PropsWithoutRef } from 'react'
import { Formik, FormikProps } from 'formik'
import { validateZodSchema } from 'blitz'
import { z } from 'zod'
import { Button, Text } from '@chakra-ui/react'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>['initialValues']
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = 'FORM_ERROR'

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>(null)
  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className='form' {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {formError && <Text color='red'>{formError}</Text>}

          {submitText && (
            <Button mt='2' type='submit' isLoading={isSubmitting} variant='outline'>
              {submitText}
            </Button>
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
