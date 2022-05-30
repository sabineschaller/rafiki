import { Logger } from 'pino'
import { validateId } from '../../../shared/utils'
import { AppContext } from '../../../app'
import { IAppConfig } from '../../../config/app'
import { OutgoingPaymentService } from './service'
import { isOutgoingPaymentError, errorToCode, errorToMessage } from './errors'
import { OutgoingPayment, OutgoingPaymentState } from './model'
import {
  getListPageInfo,
  parsePaginationQueryParameters
} from '../../../shared/pagination'
import { Pagination } from '../../../shared/baseModel'

interface ServiceDependencies {
  config: IAppConfig
  logger: Logger
  outgoingPaymentService: OutgoingPaymentService
}

export interface OutgoingPaymentRoutes {
  get(ctx: AppContext): Promise<void>
  create(ctx: AppContext): Promise<void>
  list(ctx: AppContext): Promise<void>
}

export function createOutgoingPaymentRoutes(
  deps_: ServiceDependencies
): OutgoingPaymentRoutes {
  const logger = deps_.logger.child({
    service: 'OutgoingPaymentRoutes'
  })
  const deps = { ...deps_, logger }
  return {
    get: (ctx: AppContext) => getOutgoingPayment(deps, ctx),
    create: (ctx: AppContext) => createOutgoingPayment(deps, ctx),
    list: (ctx: AppContext) => listOutgoingPayments(deps, ctx)
  }
}

async function getOutgoingPayment(
  deps: ServiceDependencies,
  ctx: AppContext
): Promise<void> {
  const { outgoingPaymentId: outgoingPaymentId } = ctx.params
  ctx.assert(validateId(outgoingPaymentId), 400, 'invalid id')
  const acceptJSON = ctx.accepts('application/json')
  ctx.assert(acceptJSON, 406)

  let outgoingPayment: OutgoingPayment | undefined
  try {
    outgoingPayment = await deps.outgoingPaymentService.get(outgoingPaymentId)
  } catch (_) {
    ctx.throw(500, 'Error trying to get outgoing payment')
  }
  if (!outgoingPayment) return ctx.throw(404)

  const body = outgoingPaymentToBody(deps, outgoingPayment)
  ctx.body = body
}

async function createOutgoingPayment(
  deps: ServiceDependencies,
  ctx: AppContext
): Promise<void> {
  const { accountId } = ctx.params
  ctx.assert(validateId(accountId), 400, 'invalid account id')
  ctx.assert(ctx.accepts('application/json'), 406, 'must accept json')
  ctx.assert(
    ctx.get('Content-Type') === 'application/json',
    400,
    'must send json body'
  )

  const { body } = ctx.request
  if (typeof body !== 'object') return ctx.throw(400, 'json body required')

  if (typeof body.quoteId !== 'string') return ctx.throw(400, 'invalid quoteId')

  if (body.description !== undefined && typeof body.description !== 'string')
    return ctx.throw(400, 'invalid description')
  if (body.externalRef !== undefined && typeof body.externalRef !== 'string')
    return ctx.throw(400, 'invalid externalRef')

  const paymentOrErr = await deps.outgoingPaymentService.create({
    accountId,
    quoteId: body.quoteId,
    description: body.description,
    externalRef: body.externalRef
  })

  if (isOutgoingPaymentError(paymentOrErr)) {
    return ctx.throw(errorToCode[paymentOrErr], errorToMessage[paymentOrErr])
  }

  ctx.status = 201
  const res = outgoingPaymentToBody(deps, paymentOrErr)
  ctx.body = res
}

async function listOutgoingPayments(
  deps: ServiceDependencies,
  ctx: AppContext
): Promise<void> {
  // todo: validation
  const { accountId } = ctx.params
  const { first, last, cursor } = ctx.request.query
  let pagination: Pagination
  try {
    pagination = parsePaginationQueryParameters(first, last, cursor)
  } catch (err) {
    ctx.throw(404, err.message)
  }
  try {
    const page = await deps.outgoingPaymentService.getAccountPage(
      accountId,
      pagination
    )
    const pageInfo = await getListPageInfo(
      (pagination: Pagination) =>
        deps.outgoingPaymentService.getAccountPage(accountId, pagination),
      page,
      pagination
    )
    const result = {
      pagination: pageInfo,
      result: page.map((item: OutgoingPayment) =>
        outgoingPaymentToBody(deps, item)
      )
    }
    ctx.body = result
  } catch (_) {
    ctx.throw(500, 'Error trying to list outgoing payments')
  }
}

function outgoingPaymentToBody(
  deps: ServiceDependencies,
  outgoingPayment: OutgoingPayment
) {
  return Object.fromEntries(
    Object.entries({
      ...outgoingPayment.toJSON(),
      accountId: `${deps.config.publicHost}/${outgoingPayment.accountId}`,
      id: `${deps.config.publicHost}/${outgoingPayment.accountId}/outgoing-payments/${outgoingPayment.id}`,
      state: [
        OutgoingPaymentState.Funding,
        OutgoingPaymentState.Sending
      ].includes(outgoingPayment.state)
        ? 'processing'
        : outgoingPayment.state.toLowerCase()
    }).filter(([_, v]) => v != null)
  )
}