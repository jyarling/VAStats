export function downloadCsv<T extends Record<string, unknown>>(data: T[]) {
  if (data.length === 0) return
  const headers = Object.keys(data[0])
  const rows = data.map((row) =>
    headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'logbook.csv'
  link.click()
  URL.revokeObjectURL(url)
}
