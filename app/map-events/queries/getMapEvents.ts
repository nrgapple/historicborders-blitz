import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetMapEventsInput
  extends Pick<Prisma.MapEventFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMapEventsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: mapEvents,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.mapEvent.count({ where }),
      query: paginateArgs => db.mapEvent.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      mapEvents,
      nextPage,
      hasMore,
      count,
    }
  }
)
