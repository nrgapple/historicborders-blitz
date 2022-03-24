import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetMapEvent = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetMapEvent), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const mapEvent = await db.mapEvent.findFirst({ where: { id } })

  if (!mapEvent) throw new NotFoundError()

  return mapEvent
})
