// Modal.tsx
import React from "react"
import "./Modal.css"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <header className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="modal-close">X</button>
                </header>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    )
}

export default Modal
