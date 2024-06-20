import { getProductsByCatSubCat } from "@/api/products";
import Products from "@/templates/Shop/Products/Products";

const getProductMegapixels = (product) =>
  parseInt(product.details?.megapixels || 0);

const getProductsImgSec = (product) => {
  return parseInt(product.details?.imgSec || 0);
};

function getFiltersFromProducts(products) {
  const brands = [...new Set(products.map((product) => product.brand))];

  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));

  const megapixels = products
    .map((product) => getProductMegapixels(product))
    .filter((value) => value);
  const uniqueMegapixels = Array.from(new Set(megapixels)).sort(
    (a, b) => a - b
  );

  const imgSec = products
    .map((product) => getProductsImgSec(product))
    .filter((value) => value);
  const uniqueImgSec = Array.from(new Set(imgSec)).sort((a, b) => a - b);

  const getColor = (product) => {
    return product.details?.couleur || "";
  };
  const colors = products
    .map((product) => getColor(product).trim())
    .filter((value) => value);
  const uniqueColors = Array.from(new Set(colors)).sort();

  const getProductsInfrarouge = (product) => {
    return product.details?.infrarouge || "";
  };
  const infrarouge = products
    .map((product) => getProductsInfrarouge(product).trim())
    .filter((value) => value);
  const uniqueInfrarouge = Array.from(new Set(infrarouge)).sort(
    (a, b) => a - b
  );

  // const distanceInfrarouge = data
  //   .map((product) => getProductsDistanceInfrarouge(product))
  //   .filter((value) => value);
  // const uniqueDistanceInfrarouge = Array.from(new Set(distanceInfrarouge)).sort(
  //   (a, b) => a - b
  // );
  // setDistanceInfrarougeValues(uniqueDistanceInfrarouge);

  // const installationExt = data
  //   .map((product) => getProductsInstallationExt(product).trim())
  //   .filter((value) => value);
  // const uniqueInstallationExt = Array.from(new Set(installationExt)).sort(
  //   (a, b) => a - b
  // );
  // setInstallationExtValues(uniqueInstallationExt);

  // const nbrePorts = data
  //   .map((product) => getProductsNbrePorts(product))
  //   .filter((value) => value);
  // const uniqueNbrePorts = Array.from(new Set(nbrePorts)).sort((a, b) => a - b);
  // setNbrePortsValues(uniqueNbrePorts);

  // const rackable = data
  //   .map((product) => getProductsRackable(product).trim())
  //   .filter((value) => value);
  // const uniqueRackable = Array.from(new Set(rackable)).sort((a, b) => a - b);
  // setRackableValues(uniqueRackable);

  // const manageable = data
  //   .map((product) => getProductsManageable(product).trim())
  //   .filter((value) => value);
  // const uniqueManageable = Array.from(new Set(manageable)).sort(
  //   (a, b) => a - b
  // );
  // setManageableValues(uniqueManageable);

  // const poe = data
  //   .map((product) => getProductsPoe(product).trim())
  //   .filter((value) => value);
  // const uniquePoe = Array.from(new Set(poe)).sort((a, b) => a - b);
  // setPoeValues(uniquePoe);

  // const poePlus = data
  //   .map((product) => getProductsPoePlus(product).trim())
  //   .filter((value) => value);
  // const uniquePoePlus = Array.from(new Set(poePlus)).sort((a, b) => a - b);
  // setPoePlusValues(uniquePoePlus);

  // const poePlusPlus = data
  //   .map((product) => getProductsPoePlusPlus(product).trim())
  //   .filter((value) => value);
  // const uniquePoePlusPlus = Array.from(new Set(poePlusPlus)).sort(
  //   (a, b) => a - b
  // );
  // setPoePlusPlusValues(uniquePoePlusPlus);

  // const usb = data
  //   .map((product) => getProductsUsb(product).trim())
  //   .filter((value) => value);
  // const uniqueUsb = Array.from(new Set(usb)).sort((a, b) => a - b);
  // setUsbValues(uniqueUsb);

  // const debitVpn = data
  //   .map((product) => getProductsDebitVpn(product).trim())
  //   .filter((value) => value);
  // const uniqueDebitVpn = Array.from(new Set(debitVpn)).sort((a, b) => a - b);
  // setDebitVpnValues(uniqueDebitVpn);

  // const maxTcp = data
  //   .map((product) => getProductsMaxTcp(product).trim())
  //   .filter((value) => value);
  // const uniqueMaxTcp = Array.from(new Set(maxTcp)).sort((a, b) => a - b);
  // setMaxTcpValues(uniqueMaxTcp);

  // const debitFirewall = data
  //   .map((product) => getProductsDebitFirewall(product).trim())
  //   .filter((value) => value);
  // const uniqueDebitFirewall = Array.from(new Set(debitFirewall)).sort(
  //   (a, b) => a - b
  // );
  // setDebitFirewallValues(uniqueDebitFirewall);

  // const vitesse = data
  //   .map((product) => getProductsVitesse(product).trim())
  //   .filter((value) => value);
  // const uniqueVitesse = Array.from(new Set(vitesse)).sort((a, b) => a - b);
  // setVitesseValues(uniqueVitesse);

  // const typeWifi = data
  //   .map((product) => getProductsTypeWifi(product).trim())
  //   .filter((value) => value);
  // const uniqueTypeWifi = Array.from(new Set(typeWifi)).sort((a, b) => a - b);
  // setTypeWifiValues(uniqueTypeWifi);

  // const antenne = data
  //   .map((product) => getProductsAntenne(product).trim())
  //   .filter((value) => value);
  // const uniqueAntenne = Array.from(new Set(antenne)).sort((a, b) => a - b);
  // setAntenneValues(uniqueAntenne);

  // const lan = data
  //   .map((product) => getProductsLan(product).trim())
  //   .filter((value) => value);
  // const uniqueLan = Array.from(new Set(lan)).sort((a, b) => a - b);
  // setLanValues(uniqueLan);

  // const nebula = data
  //   .map((product) => getProductsNebula(product).trim())
  //   .filter((value) => value);
  // const uniqueNebula = Array.from(new Set(nebula)).sort((a, b) => a - b);
  // setNebulaValues(uniqueNebula);

  return {
    brand: {
      title: "Marques",
      queryKey: "brand",
      filters: brands,
    },
    // price: { min: minPrice, max: maxPrice },
    megapixels: {
      title: "Megapixel",
      queryKey: "megapixels",
      filters: uniqueMegapixels,
    },
    // uniqueImgSec,
    // uniqueColors,
    // uniqueInfrarouge,
  };
}

export async function getServerSideProps({ params, query }) {
  const category = params.category;
  const products = await getProductsByCatSubCat({ category });
  console.log({ query });
  const productsFiltered = products
    .filter((product) =>
      query.brand ? query.brand.includes(product.brand) : true
    )
    .filter((product) =>
      query.megapixels
        ? query.megapixels.includes(getProductMegapixels(product))
        : true
    );

  const filters = getFiltersFromProducts(productsFiltered);

  return {
    props: {
      products: productsFiltered,
      category,
      filters,
    },
  };
}

export default function Page({ products, category, filters }) {
  return <Products products={products} category={category} filters={filters} />;
}
