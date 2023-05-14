import { assert, assertNever, isNotUndefined, isUndefined } from '@/infra/utils/ts-utils';

type A = {type: 'a'};
type B = {type: 'b'};
type Union = A | B;

describe('ts-utils', () => {
  it('assertNever will return an error if value does not match condition', () => {
    function doSomething(arg: Union) {
      if (arg.type === 'a') {
        return '';
      }

      if (arg.type === 'b') {
        return '';
      }

      return assertNever(arg);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const arg: Union = { type: 'c' }

    try {
      expect(doSomething(arg))
    } catch (e) {
      expect(e).toStrictEqual(new Error(`Invalid value. Should be never, got ${arg.toString()}`))
    }
  })

  it('assert must throw error on falsy condition', () => {
    try {
      expect(assert(false))
    } catch (e) {
      expect(e).toStrictEqual(new Error('value must be defined'))
    }
  })

  it('isUndefined must return true only for undefined value', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('temp')).toBe(false)
    expect(isUndefined(3)).toBe(false)
  })

  it('isNotUndefined must return true for no undefined value', () => {
    expect(isNotUndefined(undefined)).toBe(false)
    expect(isNotUndefined(null)).toBe(true)
    expect(isNotUndefined('temp')).toBe(true)
    expect(isNotUndefined(3)).toBe(true)
  })
})