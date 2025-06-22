import type { FC } from 'react'

export interface PaginationProps {
  current: number
  totalPages: number
  onChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ current, totalPages, onChange }) => {
  const prevDisabled = current <= 1
  const nextDisabled = current >= totalPages

  const goPrev = () => {
    if (!prevDisabled) onChange(current - 1)
  }

  const goNext = () => {
    if (!nextDisabled) onChange(current + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={goPrev}
        disabled={prevDisabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={nextDisabled}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
