import SeccionPrincipal from "./blocks/SeccionPrincipal";
import HeroEditorial from "./blocks/HeroEditorial";
import Cuerpo from "./blocks/Cuerpo";
import TituloPrincipal from "./blocks/TituloPrincipal";
import Tarjetas from "./blocks/Tarjetas";
import TarjetasContenido from "./blocks/TarjetasContenido";
import TarjetasMetricas from "./blocks/TarjetasMetricas";
import Carrusel from "./blocks/Carrusel";
import Galeria from "./blocks/Galeria";
import Youtube from "./blocks/Youtube";
import Mapa from "./blocks/Mapa";
import TarjetasPrecios from "./blocks/TarjetasPrecios";
import PreguntasFrecuentes from "./blocks/PreguntasFrecuentes";
import FormularioContacto from "./blocks/FormularioContacto";
import Catalogo from "./blocks/Catalogo";

const componentMap = {
  "presentacion-pagina.seccion-principal": SeccionPrincipal,
  "presentacion-pagina.heroeditorial": HeroEditorial,
  "contenido.cuerpo": Cuerpo,
  "contenido.titulo-principal": TituloPrincipal,
  "contenido.tarjetas": Tarjetas,
  "contenido.tarjetascontenido": TarjetasContenido,
  "contenido.tarjetas-metricas": TarjetasMetricas,
  "medios-visuales.carrusel": Carrusel,
  "medios-visuales.galeria": Galeria,
  "servicios-externos.youtube": Youtube,
  "servicios-externos.mapa": Mapa,
  "comercial.planes-precios": TarjetasPrecios,
  "contenido.preguntas-frecuentes": PreguntasFrecuentes,
  "servicios-externos.correo": FormularioContacto,
  "contenido.tarjeta-individual": null,
  "independientes.link": null,
  "independientes.boton": null,
  "comercial.catalogo": Catalogo,
};

export default componentMap;
