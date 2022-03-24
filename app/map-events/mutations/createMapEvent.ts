import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateMapEvent = z.object({
  label: z.string(),
  body: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  feature: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateMapEvent),
  resolver.authorize(),
  async (data, { session }) => {
    const mapEvent = await db.mapEvent.create({
      data: { ...data, userId: session.userId },
    })
    return mapEvent
  }
)
