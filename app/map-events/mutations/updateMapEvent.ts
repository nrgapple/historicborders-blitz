import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export const UpdateMapEvent = z.object({
  id: z.number(),
  label: z.string(),
  body: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  feature: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateMapEvent),
  resolver.authorize(),
  async ({ id, ...data }, { session }) => {
    const mapEvent = await db.mapEvent.update({
      where: {
        id_userId: {
          id,
          userId: session.userId,
        },
      },
      data,
    })
    return mapEvent
  }
)
