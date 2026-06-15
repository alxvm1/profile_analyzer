import * as Dialog from '@radix-ui/react-dialog'
import './style.css'
import type { ModalProps } from './types'

export const Modal = ({ open, onOpenChange, title, children, footer }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="modal-scrim">
        <Dialog.Content className="modal">
          <div className="modal__head">
            <Dialog.Title className="t-h3">{title}</Dialog.Title>
            <Dialog.Close className="btn btn--ghost btn--icon btn--sm">✕</Dialog.Close>
          </div>
          <div className="modal__body">{children}</div>
          {footer && <div className="modal__foot">{footer}</div>}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
)