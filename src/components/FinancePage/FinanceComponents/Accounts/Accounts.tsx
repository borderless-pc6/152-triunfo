"use client"

import { useState } from "react"
import type { AccountData } from "../../FinancePage"
import "./Accounts.css"

interface AccountsProps {
    accounts: AccountData[]
}

export default function Accounts({ accounts }: AccountsProps) {
    const [filter, setFilter] = useState<"all" | "pending" | "paid" | "overdue">("all")

    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("pt-BR")
    }

    // Filtrar contas
    const filteredAccounts = accounts.filter((account) => {
        if (filter !== "all" && account.status !== filter) {
            return false
        }
        return true
    })

    // Calcular totais
    const totalPending = accounts.filter((a) => a.status === "pending").reduce((sum, account) => sum + account.amount, 0)

    const totalOverdue = accounts.filter((a) => a.status === "overdue").reduce((sum, account) => sum + account.amount, 0)

    const totalPaid = accounts.filter((a) => a.status === "paid").reduce((sum, account) => sum + account.amount, 0)

    return (
        <div className="accounts">
            <div className="accounts-summary">
                <div className="summary-box pending-box">
                    <div className="summary-label">A Receber</div>
                    <div className="summary-value">{formatCurrency(totalPending)}</div>
                    <div className="summary-count">{accounts.filter((a) => a.status === "pending").length} contas</div>
                </div>
                <div className="summary-box overdue-box">
                    <div className="summary-label">Atrasadas</div>
                    <div className="summary-value">{formatCurrency(totalOverdue)}</div>
                    <div className="summary-count">{accounts.filter((a) => a.status === "overdue").length} contas</div>
                </div>
                <div className="summary-box paid-box">
                    <div className="summary-label">Pagas</div>
                    <div className="summary-value">{formatCurrency(totalPaid)}</div>
                    <div className="summary-count">{accounts.filter((a) => a.status === "paid").length} contas</div>
                </div>
            </div>

            <div className="accounts-filters">
                <div className="filter-buttons">
                    <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                        Todas
                    </button>
                    <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
                        A Receber
                    </button>
                    <button className={filter === "overdue" ? "active" : ""} onClick={() => setFilter("overdue")}>
                        Atrasadas
                    </button>
                    <button className={filter === "paid" ? "active" : ""} onClick={() => setFilter("paid")}>
                        Pagas
                    </button>
                </div>
            </div>

            <div className="accounts-table-container">
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th>Vencimento</th>
                            <th>Descrição</th>
                            <th>Cliente/Fornecedor</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccounts.length > 0 ? (
                            filteredAccounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{formatDate(account.dueDate)}</td>
                                    <td>
                                        {account.description}
                                        {account.orderId && <span className="order-id">Ref: {account.orderId}</span>}
                                    </td>
                                    <td>{account.customer}</td>
                                    <td>{formatCurrency(account.amount)}</td>
                                    <td>
                                        <span className={`account-status ${account.status}`}>
                                            {account.status === "pending" ? "A Receber" : account.status === "paid" ? "Pago" : "Atrasado"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="account-actions">
                                            {account.status !== "paid" && <button className="action-icon mark-paid">✓</button>}
                                            <button className="action-icon edit">✎</button>
                                            <button className="action-icon delete">✕</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="no-accounts">
                                    Nenhuma conta encontrada com o filtro selecionado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="accounts-actions">
                <button className="action-button">Nova Conta a Receber</button>
                <button className="action-button">Nova Conta a Pagar</button>
            </div>
        </div>
    )
}
