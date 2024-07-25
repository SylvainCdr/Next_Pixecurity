const getProductMegapixels = (product) =>
  parseInt(product.details?.megapixels || 0);

const getProductsImgSec = (product) => parseInt(product.details?.imgSec || 0);

const getColor = (product) => product.details?.couleur || "";

const getProductsInfrarouge = (product) => product.details?.infrarouge || "";

const getProductsDistanceInfrarouge = (product) =>
  parseInt(product.details?.distanceInfrarouge || 0);

const getProductsInstallationExt = (product) =>
  product.details?.installationExt || "";

const getProductsNbrePorts = (product) =>
  parseInt(product.details?.nbrePorts || 0);

const getProductsRackable = (product) => product.details?.rackable || "";

const getProductsManageable = (product) => product.details?.manageable || "";

const getProductsPoe = (product) => product.details?.poe || "";

const getProductsPoePlus = (product) => product.details?.poePlus || "";

const getProductsPoePlusPlus = (product) => product.details?.poePlusPlus || "";

const getProductsUsb = (product) => product.details?.usb || "";

const getProductsDebitVpn = (product) => product.details?.debitVpn || "";

const getProductsMaxTcp = (product) => product.details?.maxTcp || "";

const getProductsDebitFirewall = (product) =>
  product.details?.debitFirewall || "";

const getProductsVitesse = (product) => product.details?.vitesse || "";

const getProductsTypeWifi = (product) => product.details?.typeWifi || "";

const getProductsAntenne = (product) => product.details?.antenne || "";

const getProductsLan = (product) => product.details?.lan || "";

const getProductsNebula = (product) => product.details?.nebula || "";

const getUniqueValues = (products, key, parser = (x) => x) => {
  return Array.from(
    new Set(
      products.map((product) => parser(product, key)).filter((value) => value)
    )
  ).sort((a, b) => (typeof a === "string" ? a.localeCompare(b) : a - b));
};

export function getFiltersFromProducts(products) {
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  const prices = products.map((product) => parseFloat(product.price) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const uniqueMegapixels = getUniqueValues(
    products,
    "megapixels",
    getProductMegapixels
  );
  const uniqueImgSec = getUniqueValues(products, "imgSec", getProductsImgSec);
  const uniqueColors = getUniqueValues(products, "couleur", getColor);
  const uniqueInfrarouge = getUniqueValues(
    products,
    "infrarouge",
    getProductsInfrarouge
  );
  const uniqueDistanceInfrarouge = getUniqueValues(
    products,
    "distanceInfrarouge",
    getProductsDistanceInfrarouge
  );
  const uniqueInstallationExt = getUniqueValues(
    products,
    "installationExt",
    getProductsInstallationExt
  );
  const uniqueNbrePorts = getUniqueValues(
    products,
    "nbrePorts",
    getProductsNbrePorts
  );
  const uniqueRackable = getUniqueValues(
    products,
    "rackable",
    getProductsRackable
  );
  const uniqueManageable = getUniqueValues(
    products,
    "manageable",
    getProductsManageable
  );
  const uniquePoe = getUniqueValues(products, "poe", getProductsPoe);
  const uniquePoePlus = getUniqueValues(
    products,
    "poePlus",
    getProductsPoePlus
  );
  const uniquePoePlusPlus = getUniqueValues(
    products,
    "poePlusPlus",
    getProductsPoePlusPlus
  );
  const uniqueUsb = getUniqueValues(products, "usb", getProductsUsb);
  const uniqueDebitVpn = getUniqueValues(
    products,
    "debitVpn",
    getProductsDebitVpn
  );
  const uniqueMaxTcp = getUniqueValues(products, "maxTcp", getProductsMaxTcp);
  const uniqueDebitFirewall = getUniqueValues(
    products,
    "debitFirewall",
    getProductsDebitFirewall
  );
  const uniqueVitesse = getUniqueValues(
    products,
    "vitesse",
    getProductsVitesse
  );
  const uniqueTypeWifi = getUniqueValues(
    products,
    "typeWifi",
    getProductsTypeWifi
  );
  const uniqueAntenne = getUniqueValues(
    products,
    "antenne",
    getProductsAntenne
  );
  const uniqueLan = getUniqueValues(products, "lan", getProductsLan);
  const uniqueNebula = getUniqueValues(products, "nebula", getProductsNebula);

  return {
    brand: {
      title: "Marques",
      queryKey: "brand",
      filters: brands,
    },
    price: {
      title: "Prix",
      queryKey: "price",
      filters: {
        min: minPrice,
        max: maxPrice,
      },
    },
    megapixels: {
      title: "Mégapixels",
      queryKey: "megapixels",
      filters: uniqueMegapixels,
    },
    imgSec: {
      title: "Images par seconde",
      queryKey: "imgSec",
      filters: uniqueImgSec,
    },
    colors: {
      title: "Couleurs",
      queryKey: "colors",
      filters: uniqueColors,
    },
    infrarouge: {
      title: "Infrarouge",
      queryKey: "infrarouge",
      filters: uniqueInfrarouge,
    },
    distanceInfrarouge: {
      title: "Distance infrarouge",
      queryKey: "distanceInfrarouge",
      filters: uniqueDistanceInfrarouge,
    },
    installationExt: {
      title: "Installation extérieure",
      queryKey: "installationExt",
      filters: uniqueInstallationExt,
    },
    nbrePorts: {
      title: "Nombre de ports",
      queryKey: "nbrePorts",
      filters: uniqueNbrePorts,
    },
    rackable: {
      title: "Rackable",
      queryKey: "rackable",
      filters: uniqueRackable,
    },
    manageable: {
      title: "Manageable",
      queryKey: "manageable",
      filters: uniqueManageable,
    },
    poe: {
      title: "PoE",
      queryKey: "poe",
      filters: uniquePoe,
    },
    poePlus: {
      title: "PoE+",
      queryKey: "poePlus",
      filters: uniquePoePlus,
    },
    poePlusPlus: {
      title: "PoE++",
      queryKey: "poePlusPlus",
      filters: uniquePoePlusPlus,
    },
    usb: {
      title: "USB",
      queryKey: "usb",
      filters: uniqueUsb,
    },
    debitVpn: {
      title: "Débit VPN",
      queryKey: "debitVpn",
      filters: uniqueDebitVpn,
    },
    maxTcp: {
      title: "Débit TCP",
      queryKey: "maxTcp",
      filters: uniqueMaxTcp,
    },
    debitFirewall: {
      title: "Débit Firewall",
      queryKey: "debitFirewall",
      filters: uniqueDebitFirewall,
    },
    vitesse: {
      title: "Vitesse",
      queryKey: "vitesse",
      filters: uniqueVitesse,
    },
    typeWifi: {
      title: "Type Wifi",
      queryKey: "typeWifi",
      filters: uniqueTypeWifi,
    },
    antenne: {
      title: "Antenne",
      queryKey: "antenne",
      filters: uniqueAntenne,
    },
    lan: {
      title: "LAN",
      queryKey: "lan",
      filters: uniqueLan,
    },
    nebula: {
      title: "Nebula",
      queryKey: "nebula",
      filters: uniqueNebula,
    },
  };
}

export function getProductsFiltered(products, query) {
  let priceRange = {};
  if (query.price) {
    try {
      priceRange = JSON.parse(query.price);
    } catch (error) {
      console.error("Error parsing price range:", error);
    }
  }

  return products
    .filter((product) => !query.brand || query.brand.includes(product.brand))
    .filter(
      (product) =>
        !priceRange.min || Number(product.price) >= Number(priceRange.min)
    )
    .filter(
      (product) =>
        !priceRange.max || Number(product.price) <= Number(priceRange.max)
    )
    .filter(
      (product) =>
        !query.megapixels ||
        query.megapixels.includes(getProductMegapixels(product))
    )
    .filter(
      (product) =>
        !query.imgSec || query.imgSec.includes(getProductsImgSec(product))
    )
    .filter(
      (product) => !query.colors || query.colors.includes(getColor(product))
    )
    .filter(
      (product) =>
        !query.infrarouge ||
        query.infrarouge.includes(getProductsInfrarouge(product))
    )
    .filter(
      (product) =>
        !query.distanceInfrarouge ||
        query.distanceInfrarouge.includes(
          getProductsDistanceInfrarouge(product)
        )
    )
    .filter(
      (product) =>
        !query.installationExt ||
        query.installationExt.includes(getProductsInstallationExt(product))
    )
    .filter(
      (product) =>
        !query.nbrePorts ||
        query.nbrePorts.includes(getProductsNbrePorts(product))
    )
    .filter(
      (product) =>
        !query.rackable || query.rackable.includes(getProductsRackable(product))
    )
    .filter(
      (product) =>
        !query.manageable ||
        query.manageable.includes(getProductsManageable(product))
    )
    .filter(
      (product) => !query.poe || query.poe.includes(getProductsPoe(product))
    )
    .filter(
      (product) =>
        !query.poePlus || query.poePlus.includes(getProductsPoePlus(product))
    )
    .filter(
      (product) =>
        !query.poePlusPlus ||
        query.poePlusPlus.includes(getProductsPoePlusPlus(product))
    )
    .filter(
      (product) => !query.usb || query.usb.includes(getProductsUsb(product))
    )
    .filter(
      (product) =>
        !query.debitVpn || query.debitVpn.includes(getProductsDebitVpn(product))
    )
    .filter(
      (product) =>
        !query.maxTcp || query.maxTcp.includes(getProductsMaxTcp(product))
    )
    .filter(
      (product) =>
        !query.debitFirewall ||
        query.debitFirewall.includes(getProductsDebitFirewall(product))
    )
    .filter(
      (product) =>
        !query.vitesse || query.vitesse.includes(getProductsVitesse(product))
    )
    .filter(
      (product) =>
        !query.typeWifi || query.typeWifi.includes(getProductsTypeWifi(product))
    )
    .filter(
      (product) =>
        !query.antenne || query.antenne.includes(getProductsAntenne(product))
    )
    .filter(
      (product) => !query.lan || query.lan.includes(getProductsLan(product))
    )
    .filter(
      (product) =>
        !query.nebula || query.nebula.includes(getProductsNebula(product))
    );
}
