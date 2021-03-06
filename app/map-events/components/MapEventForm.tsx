import createMapEventResolver from 'app/map-events/mutations/createMapEvent'
import { CreateMapEventSchema } from 'app/map-events/mutations/validations'
import { useMutation } from 'blitz'
import Form from '../../core/components/Form'
import LabeledTextField from '../../core/components/LabeledTextField'

interface Props {
  feature?: string
  startDate?: Date
  endDate?: Date
}

export const MapEventForm = ({ feature, startDate, endDate }: Props) => {
  const [createMapEvent] = useMutation(createMapEventResolver)

  return (
    <Form
      submitText='Submit'
      schema={CreateMapEventSchema}
      initialValues={{
        label: '',
        body: '',
        feature: feature ?? '',
        startDate: startDate ?? new Date(),
        endDate,
      }}
      onSubmit={async values => {
        await createMapEvent(values)
      }}
    >
      <LabeledTextField name='label' label='label' placeholder='label' />
      <LabeledTextField name='body' label='body' placeholder='body' />
      <LabeledTextField name='startDate' label='start date' type='date' />
    </Form>
  )
}
