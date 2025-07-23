import Button from '@shared/uikit/button/button'
import { Modal } from '@shared/uikit/modal'
import { type ConfirmModalParams } from '../model/types'

export function ConfirmationModal({ params }: { params: ConfirmModalParams }) {
  return (
    <Modal isOpen onClose={params.onClose}>
      <Modal.Header>{params.title}</Modal.Header>
      <Modal.Body>{params.description}</Modal.Body>
      <Modal.Footer>
        <Button onClick={params.onConfirm}>{params.confirmText}</Button>
        <Button onClick={params.onClose}>{params.closeText}</Button>
      </Modal.Footer>
    </Modal>
  )
}
