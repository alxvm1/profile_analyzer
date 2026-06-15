export interface Column<T> {
  key: keyof T
  header: string
  numeric?: boolean
  bold?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface TableProps<T> {
  columns: Column<T>[]
  rows: T[]
  keyField: keyof T
}
