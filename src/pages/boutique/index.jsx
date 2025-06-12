import { getProducts } from "@/api/products";
import Catalogue from "@/templates/Shop/Main/Main";

export async function getServerSideProps({ query }) {
  const userId = query.userId;

  // Appels API distincts
  const [
    iProProducts,
    vivotekCameras,
    boschCameras,
    milestoneProducts,
    genetecProducts,
    divinitiProducts,
  ] = await Promise.all([
    getProducts(userId, "i-PRO", 15, "Cameras"), // Ajout de iPro Cameras
    getProducts(userId, "Vivotek", 15, "Cameras"), // Ajout de Vivotek Cameras
    getProducts(userId, "Bosch", 15, "Cameras"), // Ajout de Bosch Cameras
    getProducts(userId, "Milestone Systems", 15),
    getProducts(userId, "Genetec", 15),
    getProducts(userId, "DIVINITI", 30),
  ]);

  return {
    props: {
      iProProducts: [...iProProducts, ...vivotekCameras, ...boschCameras], // Fusion des produits iPro et Vivotek Cameras
      vmsProducts: [...milestoneProducts, ...genetecProducts], // Fusion des produits VMS
      divinitiProducts,
    },
  };
}

export default function Page({ iProProducts, vmsProducts, divinitiProducts }) {
  return (
    <Catalogue
      iProProducts={iProProducts}
      vmsProducts={vmsProducts}
      divinitiProducts={divinitiProducts}
    />
  );
}
