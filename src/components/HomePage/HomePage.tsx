import React from "react";
import "./HomePage.css";

const HomePage: React.FC = () => {
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
          <a href="#" className="homepage-nav-link">
            Clientes
          </a>
          <a href="#" className="homepage-nav-link">
            Ordens de Serviço
          </a>
          <a href="#" className="homepage-nav-link">
            Financeiro
          </a>
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
    </div>
  );
};

export default HomePage;
