import * as RadixTabs from '@radix-ui/react-tabs'
import './style.css'
import type { TabsProps } from './types'

export const Tabs = ({ tabs, defaultValue, variant = 'pill' }: TabsProps) => (
  <RadixTabs.Root defaultValue={defaultValue ?? tabs[0]?.value}>
    <RadixTabs.List className={`tabs ${variant === 'line' ? 'tabs--line' : ''}`}>
      {tabs.map(tab => (
        <RadixTabs.Trigger key={tab.value} value={tab.value} className="tab">
          {tab.label}
        </RadixTabs.Trigger>
      ))}
    </RadixTabs.List>
    {tabs.map(tab => (
      <RadixTabs.Content key={tab.value} value={tab.value}>
        {tab.content}
      </RadixTabs.Content>
    ))}
  </RadixTabs.Root>
)