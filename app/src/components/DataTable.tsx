import { useMemo, useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash } from 'lucide-react'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui'

export interface Column<T> {
  key: keyof T
  header: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  itemsPerPage?: number
}

interface SortableRowProps<T> {
  row: T
  columns: Column<T>[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
}

function SortableRow<T extends { id: number | string }>({
  row,
  columns,
  onEdit,
  onDelete,
}: SortableRowProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: row.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell {...listeners} className="cursor-grab">
        <GripVertical className="h-4 w-4" />
      </TableCell>
      {columns.map((col) => (
        <TableCell key={String(col.key)}>
          {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
        </TableCell>
      ))}
      {(onEdit || onDelete) && (
        <TableCell className="space-x-2 text-right">
          {onEdit && (
            <Button size="icon" variant="outline" onClick={() => onEdit(row)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button size="icon" variant="destructive" onClick={() => onDelete(row)}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  )
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onEdit,
  onDelete,
  itemsPerPage = 5,
}: DataTableProps<T>) {
  const [rows, setRows] = useState(data)
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    setRows(data)
  }, [data])
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filtered = useMemo(() => {
    const term = filter.toLowerCase()
    return rows.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(term)),
    )
  }, [filter, rows])

  const paged = useMemo(() => {
    const start = page * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, page, itemsPerPage])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setRows((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value)
          setPage(0)
        }}
        placeholder="Filter..."
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-4" />
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.header}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext
              items={paged.map((row) => row.id)}
              strategy={verticalListSortingStrategy}
            >
              {paged.map((row) => (
                <SortableRow
                  key={String(row.id)}
                  row={row}
                  columns={columns}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {page * itemsPerPage + 1}-{Math.min((page + 1) * itemsPerPage, filtered.length)} of {filtered.length}
        </div>
        <div className="space-x-2">
          <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => Math.max(p - 1, 0))}>
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={(page + 1) * itemsPerPage >= filtered.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}