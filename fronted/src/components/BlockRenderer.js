import componentMap from "./componentMap";

export default function BlockRenderer({ bloques }) {
  if (!Array.isArray(bloques) || bloques.length === 0) {
    return null;
  }

  return (
    <>
      {bloques.map((block, index) => {
        if (!block || typeof block !== "object" || !block.__component) {
          return null;
        }

        const Component = componentMap[block.__component];

        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[BlockRenderer] No hay componente registrado para "${block.__component}". Regístralo en src/components/componentMap.js.`
            );
          }
          return null;
        }

        return (
          <section key={`${block.__component}-${block.id ?? index}`} id={block.ancla?.trim() || undefined}>
            <Component block={block} />
          </section>
        );
      })}
    </>
  );
}
