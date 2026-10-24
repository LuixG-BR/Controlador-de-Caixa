import "./Maintenance.css";

export default function Maintenance() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-glow maintenance-glow-one" aria-hidden="true" />
      <div className="maintenance-glow maintenance-glow-two" aria-hidden="true" />

      <section className="maintenance-card" aria-labelledby="maintenance-title">
        <div className="maintenance-brand">
          <div className="maintenance-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M4 8.5h16M6.5 4.5h11A2.5 2.5 0 0 1 20 7v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17V7a2.5 2.5 0 0 1 2.5-2.5Z" />
              <path d="M8 13h2.5M8 16h5.5" />
            </svg>
          </div>
          <span>Controlador de Caixa</span>
        </div>

        <div className="maintenance-status">
          <span className="maintenance-status-dot" />
          Serviço temporariamente indisponível
        </div>

        <h1 id="maintenance-title">
          Estamos em uma pausa
          <span>operacional.</span>
        </h1>

        <p className="maintenance-description">
          O acesso ao Controlador de Caixa está temporariamente suspenso.
          As funcionalidades do sistema não estão disponíveis neste momento.
        </p>

        <div className="maintenance-divider" />

        <p className="maintenance-note">
          Agradecemos a compreensão.
        </p>

        <footer className="maintenance-footer">
          <span>Controlador de Caixa</span>
          <span className="maintenance-footer-separator" aria-hidden="true">·</span>
          <span>Indisponibilidade temporária</span>
        </footer>
      </section>
    </main>
  );
}
