export interface TabItem {
  value: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
  variant?: 'pill' | 'line'
}
