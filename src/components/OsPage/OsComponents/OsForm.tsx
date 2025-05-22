"use client"

import type React from "react"

import { useState } from "react"
import "./OsForm.css"

export interface ServiceOrderData {
    id: string
    customerName: string
    customerPhone: string
    serviceType: string
    items: {
        name: string
        quantity: number
        unitPrice: number
    }[]
    receiveDate: string
    deliveryDate: string
    status: "pending" | "processing" | "ready" | "delivered"
    notes: string
    totalPrice: number
}

export default function ServiceOrderForm({ onSubmit }: { onSubmit: (data: ServiceOrderData) => void }) {
    const [items, setItems] = useState([{ name: "", quantity: 1, unitPrice: 0 }])
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [serviceType, setServiceType] = useState("wash")
    const [receiveDate, setReceiveDate] = useState(new Date().toISOString().split("T")[0])
    const [deliveryDate, setDeliveryDate] = useState("")
    const [notes, setNotes] = useState("")

    const addItem = () => {
        setItems([...items, { name: "", quantity: 1, unitPrice: 0 }])
    }

    const removeItem = (index: number) => {
        const newItems = [...items]
        newItems.splice(index, 1)
        setItems(newItems)
    }

    const updateItem = (index: number, field: string, value: string | number) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [field]: value }
        setItems(newItems)
    }

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newOrder: ServiceOrderData = {
            id: `OS-${Date.now().toString().slice(-6)}`,
            customerName,
            customerPhone,
            serviceType,
            items,
            receiveDate,
            deliveryDate,
            status: "pending",
            notes,
            totalPrice: calculateTotal(),
        }

        onSubmit(newOrder)

        // Reset form
        setItems([{ name: "", quantity: 1, unitPrice: 0 }])
        setCustomerName("")
        setCustomerPhone("")
        setServiceType("wash")
        setReceiveDate(new Date().toISOString().split("T")[0])
        setDeliveryDate("")
        setNotes("")
    }

    return (
        <div className="service-order-form-container">
            <h2>Nova Ordem de Serviço - Lavanderia</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Dados do Cliente</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="customerName">Nome do Cliente</label>
                            <input
                                type="text"
                                id="customerName"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerPhone">Telefone</label>
                            <input
                                type="tel"
                                id="customerPhone"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Detalhes do Serviço</h3>
                    <div className="form-group">
                        <label htmlFor="serviceType">Tipo de Serviço</label>
                        <select id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                            <option value="wash">Lavagem Simples</option>
                            <option value="washAndIron">Lavar e Passar</option>
                            <option value="dryClean">Lavagem a Seco</option>
                            <option value="iron">Apenas Passar</option>
                            <option value="special">Tratamento Especial</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Itens</label>
                        <div className="items-container">
                            {items.map((item, index) => (
                                <div key={index} className="item-row">
                                    <input
                                        type="text"
                                        placeholder="Descrição do item"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, "name", e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Qtd"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Preço Unit."
                                        step="0.01"
                                        min="0"
                                        value={item.unitPrice}
                                        onChange={(e) => updateItem(index, "unitPrice", Number.parseFloat(e.target.value))}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() => removeItem(index)}
                                        disabled={items.length === 1}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="add-button" onClick={addItem}>
                                + Adicionar Item
                            </button>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="receiveDate">Data de Recebimento</label>
                            <input
                                type="date"
                                id="receiveDate"
                                value={receiveDate}
                                onChange={(e) => setReceiveDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deliveryDate">Data de Entrega Prevista</label>
                            <input
                                type="date"
                                id="deliveryDate"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Observações</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}></textarea>
                    </div>
                </div>

                <div className="form-footer">
                    <div className="total-price">
                        <span>Total:</span>
                        <span>R$ {calculateTotal().toFixed(2)}</span>
                    </div>
                    <button type="submit" className="submit-button">
                        Registrar Ordem de Serviço
                    </button>
                </div>
            </form>
        </div>
    )
}