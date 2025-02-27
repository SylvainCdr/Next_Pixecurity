import { getProducts } from "@/api/products";
import Catalogue from "@/templates/Shop/Main/Main";

export async function getServerSideProps({ query }) {
  const userId = query.userId;

  // Appels API distincts
  const [iProProducts, vivotekCameras, milestoneProducts, zyxelProducts] =
    await Promise.all([
      getProducts(userId, "i-PRO", 15, "Cameras"), // Ajout de iPro Cameras
      getProducts(userId, "Vivotek", 15, "Cameras"), // Ajout de Vivotek Cameras
      getProducts(userId, "Milestone Systems", 20),
      getProducts(userId, "Zyxel", 20),
    ]);

  return {
    props: {
      iProProducts: [...iProProducts, ...vivotekCameras], // Fusion des produits iPro et Vivotek Cameras
      milestoneProducts,
      zyxelProducts,
    },
  };
}

export default function Page({
  iProProducts,
  milestoneProducts,
  zyxelProducts,
}) {
  return (
    <Catalogue
      iProProducts={iProProducts}
      milestoneProducts={milestoneProducts}
      zyxelProducts={zyxelProducts}
    />
  );
}
