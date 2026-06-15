import * as RadixTooltip from '@radix-ui/react-tooltip'
import './style.css'
import type { TooltipProps } from './types'

export const Tooltip = ({ content, children, side = 'top' }: TooltipProps) => (
  <RadixTooltip.Provider delayDuration={300}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className="tooltip" side={side} sideOffset={6}>
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
)