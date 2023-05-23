import { useLocalPagination } from '@/composables/useLocalPagination';

describe('useLocalPagination', () => {
  it('should update page ref', () => {
    const { page, setPage } = useLocalPagination()

    expect(page.value).toBe(1)

    setPage(2)

    expect(page.value).toBe(2)
  })
})