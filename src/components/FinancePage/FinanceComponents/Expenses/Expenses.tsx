"use client"

import { useState } from "react"
import type { TransactionData } from "../../FinancePage"
import "./Expenses.css"

export interface RevenueExpensesProps {
    transactions: TransactionData[]
    dateRange: "day" | "week" | "month" | "year"
}

export default function RevenueExpenses({ transactions }: RevenueExpensesProps) {
    const [filter, setFilter] = useState<"all" | "revenue" | "expense">("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")

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

    // Filtrar transações
    const filteredTransactions = transactions.filter((transaction) => {
        if (filter !== "all" && transaction.type !== filter) {
            return false
        }
        if (categoryFilter !== "all" && transaction.category !== categoryFilter) {
            return false
        }
        return true
    })

    // Calcular totais
    const totalRevenue = transactions
        .filter((t) => t.type === "revenue")
        .reduce((sum, transaction) => sum + transaction.amount, 0)

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0)

    const balance = totalRevenue - totalExpenses

    const categories = Array.from(new Set(transactions.map((t) => t.category)))

    return (
        <div className="revenue-expenses">
            <div className="transactions-summary">
                <div className="summary-box revenue-box">
                    <div className="summary-label">Receitas</div>
                    <div className="summary-value">{formatCurrency(totalRevenue)}</div>
                </div>
                <div className="summary-box expense-box">
                    <div className="summary-label">Despesas</div>
                    <div className="summary-value">{formatCurrency(totalExpenses)}</div>
                </div>
                <div className="summary-box balance-box">
                    <div className="summary-label">Saldo</div>
                    <div className={`summary-value ${balance >= 0 ? "positive" : "negative"}`}>{formatCurrency(balance)}</div>
                </div>
            </div>

            <div className="transactions-filters">
                <div className="filter-group">
                    <label>Tipo:</label>
                    <div className="filter-buttons">
                        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                            Todos
                        </button>
                        <button className={filter === "revenue" ? "active" : ""} onClick={() => setFilter("revenue")}>
                            Receitas
                        </button>
                        <button className={filter === "expense" ? "active" : ""} onClick={() => setFilter("expense")}>
                            Despesas
                        </button>
                    </div>
                </div>

                <div className="filter-group">
                    <label>Categoria:</label>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="category-select"
                    >
                        <option value="all">Todas as categorias</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="transactions-table-container">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{formatDate(transaction.date)}</td>
                                    <td>{transaction.description}</td>
                                    <td>
                                        <span className="category-tag">{transaction.category}</span>
                                    </td>
                                    <td>{formatCurrency(transaction.amount)}</td>
                                    <td>
                                        <span className={`transaction-type ${transaction.type}`}>
                                            {transaction.type === "revenue" ? "Receita" : "Despesa"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="no-transactions">
                                    Nenhuma transação encontrada com os filtros selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="transactions-actions">
                <button className="action-button">Nova Receita</button>
                <button className="action-button">Nova Despesa</button>
                <button className="action-button export-button">Exportar</button>
            </div>
        </div>
    )
}
