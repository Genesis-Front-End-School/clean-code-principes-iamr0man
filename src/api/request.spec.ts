import { createRequestService } from '@/api/request';

describe('Request service fabric', () => {
  it('return method described in contract', () => {
    const requestService = createRequestService()

    expect(Object.hasOwn(requestService, 'request')).toBe(true)
  })
})