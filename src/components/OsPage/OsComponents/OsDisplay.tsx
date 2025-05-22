import type { ServiceOrderData } from "./OsForm"
import "./OsDisplay.css"

export default function ServiceOrderDisplay({ order }: { order: ServiceOrderData }) {
    const getServiceTypeName = (type: string) => {
        const types: Record<string, string> = {
            wash: "Lavagem Simples",
            washAndIron: "Lavar e Passar",
            dryClean: "Lavagem a Seco",
            iron: "Apenas Passar",
            special: "Tratamento Especial",
        }
        return types[type] || type
    }

    const getStatusName = (status: string) => {
        const statuses: Record<string, string> = {
            pending: "Pendente",
            processing: "Em Processamento",
            ready: "Pronto para Retirada",
            delivered: "Entregue",
        }
        return statuses[status] || status
    }

    const getStatusClass = (status: string) => {
        const classes: Record<string, string> = {
            pending: "status-pending",
            processing: "status-processing",
            ready: "status-ready",
            delivered: "status-delivered",
        }
        return classes[status] || ""
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("pt-BR")
    }

    return (
        <div className="service-order-display">
            <div className="order-header">
                <div className="order-title">
                    <h2>Ordem de Serviço: {order.id}</h2>
                    <span className={`order-status ${getStatusClass(order.status)}`}>{getStatusName(order.status)}</span>
                </div>
                <div className="order-dates">
                    <div>
                        <span>Recebido em:</span>
                        <strong>{formatDate(order.receiveDate)}</strong>
                    </div>
                    <div>
                        <span>Entrega prevista:</span>
                        <strong>{formatDate(order.deliveryDate)}</strong>
                    </div>
                </div>
            </div>

            <div className="order-section">
                <h3>Dados do Cliente</h3>
                <div className="customer-info">
                    <div>
                        <span>Nome:</span>
                        <strong>{order.customerName}</strong>
                    </div>
                    <div>
                        <span>Telefone:</span>
                        <strong>{order.customerPhone}</strong>
                    </div>
                </div>
            </div>

            <div className="order-section">
                <h3>Detalhes do Serviço</h3>
                <div className="service-type">
                    <span>Tipo de Serviço:</span>
                    <strong>{getServiceTypeName(order.serviceType)}</strong>
                </div>

                <div className="items-table-container">
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantidade</th>
                                <th>Preço Unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>R$ {item.unitPrice.toFixed(2)}</td>
                                    <td>R$ {(item.quantity * item.unitPrice).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>Total</td>
                                <td>R$ {order.totalPrice.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {order.notes && (
                    <div className="order-notes">
                        <h4>Observações:</h4>
                        <p>{order.notes}</p>
                    </div>
                )}
            </div>

            <div className="order-actions">
                <button className="action-button print-button">Imprimir</button>
                <button className="action-button edit-button">Editar</button>
                <button className="action-button status-button">Atualizar Status</button>
            </div>
        </div>
    )
}
