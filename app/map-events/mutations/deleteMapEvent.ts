import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteMapEvent = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteMapEvent),
  resolver.authorize(),
  async ({ id }, { session }) => {
    const mapEvent = await db.mapEvent.deleteMany({ where: { id, userId: session.userId } })
    return mapEvent
  }
)
