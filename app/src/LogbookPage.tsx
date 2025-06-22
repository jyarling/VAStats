import { Button, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './components'
import { useAppSelector } from './storeHooks'
import { selectLogbook } from './logbookSlice'
import { downloadCsv } from './utils/downloadCsv'

export function LogbookPage() {
  const flights = useAppSelector(selectLogbook)

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Logbook</h1>
        <Button onClick={() => downloadCsv(flights, 'logbook.csv')}>Export CSV</Button>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Landing Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight, idx) => (
            <TableRow key={flight.id} className={idx % 2 ? 'bg-gray-50' : ''}>
              <TableCell>{flight.date}</TableCell>
              <TableCell>{flight.route}</TableCell>
              <TableCell>{flight.duration}</TableCell>
              <TableCell>{flight.landingRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default LogbookPage
