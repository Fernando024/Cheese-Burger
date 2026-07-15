export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>404</h1>
      <p style={{ opacity: 0.75 }}>La página solicitada no existe.</p>
    </section>
  );
}
