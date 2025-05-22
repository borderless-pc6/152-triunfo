"use client"

import { useState } from "react"
import FinancialSummary from "./FinanceComponents/Summary/Summary"
import RevenueExpenses from "./FinanceComponents/Expenses/Expenses"
import Accounts from "./FinanceComponents/Accounts/Accounts"
import "./FinancePage.css"

// Tipos de dados
export interface FinancialSummaryData {
    totalRevenue: number
    totalExpenses: number
    profit: number
    pendingPayments: number
    completedOrders: number
    averageTicket: number
}

export interface TransactionData {
    id: string
    date: string
    description: string
    category: string
    amount: number
    type: "revenue" | "expense"
}

export interface AccountData {
    id: string
    dueDate: string
    description: string
    customer: string
    amount: number
    status: "pending" | "paid" | "overdue"
    orderId?: string
}

export default function FinancialDashboard() {
    const [dateRange, setDateRange] = useState<"day" | "week" | "month" | "year">("month")
    const [selectedTab, setSelectedTab] = useState<"overview" | "transactions" | "accounts">("overview")

    // Dados de exemplo para o resumo financeiro
    const summaryData: FinancialSummaryData = {
        totalRevenue: 12580.75,
        totalExpenses: 5240.3,
        profit: 7340.45,
        pendingPayments: 2150.0,
        completedOrders: 87,
        averageTicket: 144.6,
    }

    // Dados de exemplo para transações
    const transactions: TransactionData[] = [
        {
            id: "T001",
            date: "2025-05-18",
            description: "Pagamento OS-001 - Maria Silva",
            category: "Serviços",
            amount: 75.9,
            type: "revenue",
        },
        {
            id: "T002",
            date: "2025-05-18",
            description: "Pagamento OS-002 - João Oliveira",
            category: "Serviços",
            amount: 45.5,
            type: "revenue",
        },
        {
            id: "T003",
            date: "2025-05-17",
            description: "Compra de detergente",
            category: "Insumos",
            amount: 120.0,
            type: "expense",
        },
        {
            id: "T004",
            date: "2025-05-16",
            description: "Pagamento OS-004 - Carlos Pereira",
            category: "Serviços",
            amount: 65.75,
            type: "revenue",
        },
        {
            id: "T005",
            date: "2025-05-15",
            description: "Conta de água",
            category: "Utilidades",
            amount: 350.0,
            type: "expense",
        },
        {
            id: "T006",
            date: "2025-05-15",
            description: "Conta de energia",
            category: "Utilidades",
            amount: 420.3,
            type: "expense",
        },
        {
            id: "T007",
            date: "2025-05-14",
            description: "Pagamento OS-005 - Ana Beatriz",
            category: "Serviços",
            amount: 95.0,
            type: "revenue",
        },
        {
            id: "T008",
            date: "2025-05-13",
            description: "Manutenção da máquina de lavar",
            category: "Manutenção",
            amount: 250.0,
            type: "expense",
        },
    ]

    // Dados de exemplo para contas a receber/pagar
    const accounts: AccountData[] = [
        {
            id: "A001",
            dueDate: "2025-05-25",
            description: "OS-006 - Lavagem de roupas de cama",
            customer: "Pedro Santos",
            amount: 120.0,
            status: "pending",
            orderId: "OS-006",
        },
        {
            id: "A002",
            dueDate: "2025-05-20",
            description: "OS-007 - Lavagem de roupas delicadas",
            customer: "Mariana Costa",
            amount: 85.5,
            status: "pending",
            orderId: "OS-007",
        },
        {
            id: "A003",
            dueDate: "2025-05-15",
            description: "Fornecedor de embalagens",
            customer: "Embalagens Ltda",
            amount: 350.0,
            status: "paid",
        },
        {
            id: "A004",
            dueDate: "2025-05-10",
            description: "OS-003 - Lavagem de tapetes",
            customer: "Ana Santos",
            amount: 120.0,
            status: "paid",
            orderId: "OS-003",
        },
        {
            id: "A005",
            dueDate: "2025-05-05",
            description: "Aluguel do espaço",
            customer: "Imobiliária Central",
            amount: 1800.0,
            status: "paid",
        },
        {
            id: "A006",
            dueDate: "2025-04-30",
            description: "OS-008 - Lavagem de cortinas",
            customer: "Roberto Alves",
            amount: 210.0,
            status: "overdue",
            orderId: "OS-008",
        },
    ]

    const handleDateRangeChange = (range: "day" | "week" | "month" | "year") => {
        setDateRange(range)
    }

    return (
        <div className="financial-dashboard">
            <div className="dashboard-header">
                <h1>Financeiro</h1>
                <div className="date-range-selector">
                    <button className={dateRange === "day" ? "active" : ""} onClick={() => handleDateRangeChange("day")}>
                        Hoje
                    </button>
                    <button className={dateRange === "week" ? "active" : ""} onClick={() => handleDateRangeChange("week")}>
                        Esta Semana
                    </button>
                    <button className={dateRange === "month" ? "active" : ""} onClick={() => handleDateRangeChange("month")}>
                        Este Mês
                    </button>
                    <button className={dateRange === "year" ? "active" : ""} onClick={() => handleDateRangeChange("year")}>
                        Este Ano
                    </button>
                </div>
            </div>

            <div className="dashboard-tabs">
                <button className={selectedTab === "overview" ? "active" : ""} onClick={() => setSelectedTab("overview")}>
                    Visão Geral
                </button>
                <button
                    className={selectedTab === "transactions" ? "active" : ""}
                    onClick={() => setSelectedTab("transactions")}
                >
                    Receitas e Despesas
                </button>
                <button className={selectedTab === "accounts" ? "active" : ""} onClick={() => setSelectedTab("accounts")}>
                    Contas a Receber/Pagar
                </button>
            </div>

            <div className="dashboard-content">
                {selectedTab === "overview" && <FinancialSummary data={summaryData} dateRange={dateRange} />}
                {selectedTab === "transactions" && <RevenueExpenses transactions={transactions} dateRange={dateRange} />}
                {selectedTab === "accounts" && <Accounts accounts={accounts} />}
            </div>
        </div>
    )
}
