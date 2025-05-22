import type { FinancialSummaryData } from "../../FinancePage"
import "./Summary.css"

interface FinancialSummaryProps {
    data: FinancialSummaryData
    dateRange: "day" | "week" | "month" | "year"
}

export default function FinancialSummary({ data, dateRange }: FinancialSummaryProps) {
    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }

    const getDateRangeText = () => {
        const today = new Date()
        switch (dateRange) {
            case "day":
                return `${today.toLocaleDateString("pt-BR")}`
            case "week":
                return "Esta Semana"
            case "month":
                return `${today.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}`
            case "year":
                return `${today.getFullYear()}`
            default:
                return ""
        }
    }

    const profitPercentage = (data.profit / data.totalRevenue) * 100

    return (
        <div className="financial-summary">
            <div className="summary-header">
                <h2>Resumo Financeiro</h2>
                <span className="date-range">{getDateRangeText()}</span>
            </div>

            <div className="summary-cards">
                <div className="summary-card">
                    <div className="card-title">Receita Total</div>
                    <div className="card-value revenue">{formatCurrency(data.totalRevenue)}</div>
                    <div className="card-comparison">
                        <span className="positive">+12.5%</span> em relação ao período anterior
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-title">Despesas Totais</div>
                    <div className="card-value expense">{formatCurrency(data.totalExpenses)}</div>
                    <div className="card-comparison">
                        <span className="negative">+5.2%</span> em relação ao período anterior
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-title">Lucro</div>
                    <div className="card-value profit">{formatCurrency(data.profit)}</div>
                    <div className="card-comparison">
                        <span className="positive">+18.3%</span> em relação ao período anterior
                    </div>
                </div>
            </div>

            <div className="profit-bar">
                <div className="profit-bar-label">Margem de Lucro</div>
                <div className="profit-bar-container">
                    <div className="profit-bar-progress" style={{ width: `${profitPercentage}%` }}></div>
                    <span className="profit-bar-percentage">{profitPercentage.toFixed(1)}%</span>
                </div>
            </div>

            <div className="summary-metrics">
                <div className="metric-card">
                    <div className="metric-title">Pagamentos Pendentes</div>
                    <div className="metric-value">{formatCurrency(data.pendingPayments)}</div>
                </div>

                <div className="metric-card">
                    <div className="metric-title">Ordens Concluídas</div>
                    <div className="metric-value">{data.completedOrders}</div>
                </div>

                <div className="metric-card">
                    <div className="metric-title">Ticket Médio</div>
                    <div className="metric-value">{formatCurrency(data.averageTicket)}</div>
                </div>
            </div>

            <div className="chart-container">
                <h3>Receitas x Despesas</h3>
                <div className="chart-placeholder">
                    <div className="chart-bars">
                        <div className="chart-bar-group">
                            <div className="chart-label">Jan</div>
                            <div className="chart-bar-container">
                                <div className="chart-bar revenue-bar" style={{ height: "65%" }}></div>
                                <div className="chart-bar expense-bar" style={{ height: "40%" }}></div>
                            </div>
                        </div>
                        <div className="chart-bar-group">
                            <div className="chart-label">Fev</div>
                            <div className="chart-bar-container">
                                <div className="chart-bar revenue-bar" style={{ height: "70%" }}></div>
                                <div className="chart-bar expense-bar" style={{ height: "45%" }}></div>
                            </div>
                        </div>
                        <div className="chart-bar-group">
                            <div className="chart-label">Mar</div>
                            <div className="chart-bar-container">
                                <div className="chart-bar revenue-bar" style={{ height: "60%" }}></div>
                                <div className="chart-bar expense-bar" style={{ height: "35%" }}></div>
                            </div>
                        </div>
                        <div className="chart-bar-group">
                            <div className="chart-label">Abr</div>
                            <div className="chart-bar-container">
                                <div className="chart-bar revenue-bar" style={{ height: "75%" }}></div>
                                <div className="chart-bar expense-bar" style={{ height: "50%" }}></div>
                            </div>
                        </div>
                        <div className="chart-bar-group">
                            <div className="chart-label">Mai</div>
                            <div className="chart-bar-container">
                                <div className="chart-bar revenue-bar" style={{ height: "85%" }}></div>
                                <div className="chart-bar expense-bar" style={{ height: "40%" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <div className="legend-color revenue-color"></div>
                            <div className="legend-label">Receitas</div>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color expense-color"></div>
                            <div className="legend-label">Despesas</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
