import React, { useState } from "react"
import ClientePage from "../ClientePage/ClientePage"
import OsPage from "../OsPage/OsPage"
import FinancePage from "../FinancePage/FinancePage"
import Modal from "./Modal"
import "./HomePage.css"

const HomePage: React.FC = () => {
  const [isClientModalOpen, setClientModalOpen] = useState(false)
  const [isOsModalOpen, setOsModalOpen] = useState(false)
  const [isFinanceModalOpen, setFinanceModalOpen] = useState(false)

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="homepage-header-top">
          <img
            src="/logo-oclav.png"
            alt="Logo OCLav"
            className="homepage-logo"
          />
          <h1 className="homepage-title">Sistema de Gestão para Lavanderias</h1>
        </div>

        <nav className="homepage-nav">
          <button
            onClick={() => setClientModalOpen(true)}
            className="homepage-nav-link"
          >
            Clientes
          </button>
          <button
            onClick={() => setOsModalOpen(true)}
            className="homepage-nav-link"
          >
            Ordens de Serviço
          </button>
          <button
            onClick={() => setFinanceModalOpen(true)}
            className="homepage-nav-link"
          >
            Financeiro
          </button>
        </nav>
      </header>

      <main className="homepage-main">
        <p className="homepage-welcome">Bem-vindo ao OCLav!</p>
        <p className="homepage-description">
          Você fez login com sucesso. Utilize o menu acima para acessar os
          módulos do sistema.
        </p>
      </main>

      <footer className="homepage-footer">
        <p>© 2025 OCLav - Todos os direitos reservados.</p>
      </footer>

      <Modal
        isOpen={isClientModalOpen}
        onClose={() => setClientModalOpen(false)}
        title="Clientes"
      >
        <ClientePage />
      </Modal>

      <Modal
        isOpen={isOsModalOpen}
        onClose={() => setOsModalOpen(false)}
        title="Ordens de Serviço"
      >
        <OsPage />
      </Modal>

      <Modal
        isOpen={isFinanceModalOpen}
        onClose={() => setFinanceModalOpen(false)}
        title="Financeiro"
      >
        <FinancePage />
      </Modal>
    </div>
  )
}

export default HomePage
