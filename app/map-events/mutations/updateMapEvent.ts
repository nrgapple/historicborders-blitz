import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateMapEvent = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateMapEvent),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mapEvent = await db.mapEvent.update({ where: { id }, data })

    return mapEvent
  }
)
