"use client"

import { useState } from "react"
import ServiceOrderForm, { type ServiceOrderData } from "./OsComponents/OsForm"
import ServiceOrderDisplay from "./OsComponents/OsDisplay"
import Modal from "./OsComponents/Modal"
import "./OsPage.css"

export default function Home() {
    const [orders, setOrders] = useState<ServiceOrderData[]>([])
    const [selectedOrder, setSelectedOrder] = useState<ServiceOrderData | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = (data: ServiceOrderData) => {
        const newOrders = [data, ...orders]
        setOrders(newOrders)
        setSelectedOrder(data)
        setIsModalOpen(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <main className="main-container">
            <header className="app-header">
                <h1>Sistema de Lavanderia</h1>
                <button className="new-order-button" onClick={openModal}>
                    + Nova Ordem de Serviço
                </button>
            </header>

            <div className="content-container">
                {selectedOrder ? (
                    <div className="order-view">
                        <div className="order-view-header">
                            <h2>Detalhes da Ordem de Serviço</h2>
                            <button className="back-button" onClick={() => setSelectedOrder(null)}>
                                Voltar para Lista
                            </button>
                        </div>
                        <ServiceOrderDisplay order={selectedOrder} />
                    </div>
                ) : orders.length > 0 ? (
                    <div className="orders-list">
                        <h2>Ordens de Serviço</h2>
                        <div className="orders-grid">
                            {orders.map((order, index) => (
                                <div key={index} className="order-card" onClick={() => setSelectedOrder(order)}>
                                    <div className="order-card-header">
                                        <span className="order-id">{order.id}</span>
                                        <span className={`order-status-badge status-${order.status}`}>
                                            {order.status === "pending"
                                                ? "Pendente"
                                                : order.status === "processing"
                                                    ? "Em Processamento"
                                                    : order.status === "ready"
                                                        ? "Pronto"
                                                        : "Entregue"}
                                        </span>
                                    </div>
                                    <div className="order-card-customer">{order.customerName}</div>
                                    <div className="order-card-details">
                                        <div>Itens: {order.items.length}</div>
                                        <div>Total: R$ {order.totalPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="order-card-date">
                                        Entrega: {new Date(order.deliveryDate).toLocaleDateString("pt-BR")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <h2>Nenhuma ordem de serviço registrada</h2>
                        <p>Clique no botão "Nova Ordem de Serviço" para registrar uma nova ordem.</p>
                        <button className="new-order-button-large" onClick={openModal}>
                            + Nova Ordem de Serviço
                        </button>
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Nova Ordem de Serviço - Lavanderia">
                <ServiceOrderForm onSubmit={handleSubmit} />
            </Modal>
        </main>
    )
}
