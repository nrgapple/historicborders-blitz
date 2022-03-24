import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteMapEvent = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteMapEvent), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const mapEvent = await db.mapEvent.deleteMany({ where: { id } })

  return mapEvent
})
