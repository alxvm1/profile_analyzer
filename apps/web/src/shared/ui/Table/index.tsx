import './style.css'
import type { TableProps } from './types'

export const Table = <T,>({ columns, rows, keyField }: TableProps<T>) => (
  <div className="table-wrap">
    <table className="table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={String(row[keyField])}>
            {columns.map(col => (
              <td
                key={String(col.key)}
                className={[col.numeric && 'num', col.bold && 'strong'].filter(Boolean).join(' ')}
              >
                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)