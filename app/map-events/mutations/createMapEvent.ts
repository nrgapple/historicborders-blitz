import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateMapEvent = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateMapEvent), resolver.authorize(), async input => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const mapEvent = await db.mapEvent.create({ data: input })

  return mapEvent
})
