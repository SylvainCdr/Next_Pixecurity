const normalizeValue = (value) => {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }
  return String(value); // Valeur par défaut si ce n'est pas une chaîne
};




const getUniqueValues = (products, key, parser = (x) => x) => {
  // Extract unique values and normalize them
  const values = products
    .map((product) => normalizeValue(parser(product, key)))
    .filter((value) => value !== ''); // Remove empty values

  // Determine if the values are numeric or string
  const isNumeric = values.every(value => !isNaN(value));

  // Create a Set to get unique values and sort them accordingly
  const uniqueValues = Array.from(new Set(values));

  return uniqueValues.sort((a, b) => {
    if (isNumeric) {
      // For numeric values: sort from smallest to largest
      return parseFloat(a) - parseFloat(b);
    } else {
      // For non-numeric values: sort alphabetically
      return a.localeCompare(b);
    }
  });
};

const getProductSubcategory = (product) => product.subcategory || "";
const getProductMegapixels = (product) => parseFloat(product.details?.megapixels || 0);
const getProductsImgSec = (product) => parseInt(product.details?.imgSec || 0);
const getColor = (product) => product.details?.couleur || "";
const getProductsInfrarouge = (product) => product.details?.infrarouge || "";
const getProductsDistanceInfrarouge = (product) => parseInt(product.details?.distanceInfrarouge || 0);
const getProductsInstallationExt = (product) => product.details?.installationExt || "";
const getProductsNbrePorts = (product) => product.details?.nbrePorts || "";
const getProductsRackable = (product) => product.details?.rackable || "";
const getProductsManageable = (product) => product.details?.manageable || "";
const getProductsPoe = (product) => product.details?.poe || "";
const getProductsPoePlus = (product) => product.details?.poePlus || "";
const getProductsPoePlusPlus = (product) => product.details?.poePlusPlus || "";
const getProductsUsb = (product) => product.details?.usb || "";
const getProductsDebitVpn = (product) => product.details?.debitVpn || "";
const getProductsMaxTcp = (product) => product.details?.maxTcp || "";
const getProductsDebitFirewall = (product) => product.details?.debitFirewall || "";
const getProductsVitesse = (product) => product.details?.vitesse || "";
const getProductsTypeWifi = (product) => product.details?.typeWifi || "";
const getProductsAntenne = (product) => product.details?.antenne || "";
const getProductsLan = (product) => product.details?.lan || "";
const getProductsNebula = (product) => product.details?.nebula || "";

export function getFiltersFromProducts(products) {
  const brands = Array.from(new Set(products.map((product) => normalizeValue(product.brand)))).filter(Boolean);

  const prices = products.map((product) => parseFloat(product.price) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

const uniqueSubcategory = getUniqueValues(products, 'subcategory', getProductSubcategory).filter(Boolean);
const uniqueMegapixels = getUniqueValues(products, 'megapixels', getProductMegapixels).filter(value => value !== '0');
  const uniqueImgSec = getUniqueValues(products, 'imgSec', getProductsImgSec).filter(value => value !== '0');
  const uniqueColors = getUniqueValues(products, 'couleur', getColor).filter(Boolean);
  const uniqueInfrarouge = getUniqueValues(products, 'infrarouge', getProductsInfrarouge).filter(Boolean);
  const uniqueDistanceInfrarouge = getUniqueValues(products, 'distanceInfrarouge', getProductsDistanceInfrarouge).filter(value => value !== '0');
  const uniqueInstallationExt = getUniqueValues(products, 'installationExt', getProductsInstallationExt).filter(Boolean);
  const uniqueNbrePorts = getUniqueValues(products, 'nbrePorts', getProductsNbrePorts).filter(Boolean);
  const uniqueRackable = getUniqueValues(products, 'rackable', getProductsRackable).filter(Boolean);
  const uniqueManageable = getUniqueValues(products, 'manageable', getProductsManageable).filter(Boolean);
  const uniquePoe = getUniqueValues(products, 'poe', getProductsPoe).filter(Boolean);
  const uniquePoePlus = getUniqueValues(products, 'poePlus', getProductsPoePlus).filter(Boolean);
  const uniquePoePlusPlus = getUniqueValues(products, 'poePlusPlus', getProductsPoePlusPlus).filter(Boolean);
  const uniqueUsb = getUniqueValues(products, 'usb', getProductsUsb).filter(Boolean);
  const uniqueDebitVpn = getUniqueValues(products, 'debitVpn', getProductsDebitVpn).filter(Boolean);
  const uniqueMaxTcp = getUniqueValues(products, 'maxTcp', getProductsMaxTcp).filter(Boolean);
  const uniqueDebitFirewall = getUniqueValues(products, 'debitFirewall', getProductsDebitFirewall).filter(Boolean);
  const uniqueVitesse = getUniqueValues(products, 'vitesse', getProductsVitesse).filter(Boolean);
  const uniqueTypeWifi = getUniqueValues(products, 'typeWifi', getProductsTypeWifi).filter(Boolean);
  const uniqueAntenne = getUniqueValues(products, 'antenne', getProductsAntenne).filter(Boolean);
  const uniqueLan = getUniqueValues(products, 'lan', getProductsLan).filter(Boolean);
  const uniqueNebula = getUniqueValues(products, 'nebula', getProductsNebula).filter(Boolean);

  return {
    brand: {
      title: "Marques",
      queryKey: "brand",
      filters: brands,
    },
    subcategory: {
      title: "Sous-catégories",
      queryKey: "subcategory",
      filters: uniqueSubcategory,
    },
    // price: {
    //   title: "Prix",
    //   queryKey: "price",
    //   filters: {
    //     min: minPrice,
    //     max: maxPrice,
    //   },
    // },
    megapixels: {
      title: "Résolution (MP)",
      queryKey: "megapixels",
      filters: uniqueMegapixels,
    },
    imgSec: {
      title: "Images par seconde",
      queryKey: "imgSec",
      filters: uniqueImgSec,
    },
    couleur: {
      title: "Couleur",
      queryKey: "couleur",
      filters: uniqueColors,
    },
    infrarouge: {
      title: "Infrarouge",
      queryKey: "infrarouge",
      filters: uniqueInfrarouge,
    },
    distanceInfrarouge: {
      title: "Distance Infrarouge",
      queryKey: "distanceInfrarouge",
      filters: uniqueDistanceInfrarouge,
    },
    installationExt: {
      title: "Installation Extérieure",
      queryKey: "installationExt",
      filters: uniqueInstallationExt,
    },
    // nbrePorts: {
    //   title: "Nombre de Ports",
    //   queryKey: "nbrePorts",
    //   filters: uniqueNbrePorts,
    // },
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
    // usb: {
    //   title: "USB",
    //   queryKey: "usb",
    //   filters: uniqueUsb,
    // },
    // debitVpn: {
    //   title: "Débit VPN",
    //   queryKey: "debitVpn",
    //   filters: uniqueDebitVpn,
    // },
    // maxTcp: {
    //   title: "Max TCP",
    //   queryKey: "maxTcp",
    //   filters: uniqueMaxTcp,
    // },
    // debitFirewall: {
    //   title: "Débit Firewall",
    //   queryKey: "debitFirewall",
    //   filters: uniqueDebitFirewall,
    // },
    // vitesse: {
    //   title: "Vitesse",
    //   queryKey: "vitesse",
    //   filters: uniqueVitesse,
    // },
    // typeWifi: {
    //   title: "Type de Wifi",
    //   queryKey: "typeWifi",
    //   filters: uniqueTypeWifi,
    // },
    // antenne: {
    //   title: "Antenne",
    //   queryKey: "antenne",
    //   filters: uniqueAntenne,
    // },
    // lan: {
    //   title: "LAN",
    //   queryKey: "lan",
    //   filters: uniqueLan,
    // },
    // nebula: {
    //   title: "Nebula",
    //   queryKey: "nebula",
    //   filters: uniqueNebula,
    // },
   
  };
}


export function getProductsFiltered(products, query) {
  let priceRange = {};
  if (query.price) {
    try {
      priceRange = JSON.parse(query.price);
    } catch (error) {
      console.error('Error parsing price range:', error);
    }
  }

  return products
    .filter((product) => !query.brand || query.brand.split(',').map(normalizeValue).includes(normalizeValue(product.brand)))
    .filter((product) => !priceRange.min || Number(product.price) >= Number(priceRange.min))
    .filter((product) => !priceRange.max || Number(product.price) <= Number(priceRange.max))
    .filter((product) => !query.subcategory || query.subcategory.split(',').map(normalizeValue).includes(normalizeValue(getProductSubcategory(product))))
    .filter((product) => !query.megapixels || query.megapixels.split(',').map(normalizeValue).includes(normalizeValue(getProductMegapixels(product))))
    .filter((product) => !query.imgSec || query.imgSec.split(',').map(normalizeValue).includes(normalizeValue(getProductsImgSec(product))))
    .filter((product) => !query.colors || query.colors.split(',').map(normalizeValue).includes(normalizeValue(getColor(product))))
    .filter((product) => !query.infrarouge || query.infrarouge.split(',').map(normalizeValue).includes(normalizeValue(getProductsInfrarouge(product))))
    .filter((product) => !query.distanceInfrarouge || query.distanceInfrarouge.split(',').map(normalizeValue).includes(normalizeValue(getProductsDistanceInfrarouge(product))))
    .filter((product) => !query.installationExt || query.installationExt.split(',').map(normalizeValue).includes(normalizeValue(getProductsInstallationExt(product))))
    .filter((product) => !query.nbrePorts || query.nbrePorts.split(',').map(normalizeValue).includes(normalizeValue(getProductsNbrePorts(product))))
    .filter((product) => !query.rackable || query.rackable.split(',').map(normalizeValue).includes(normalizeValue(getProductsRackable(product))))
    .filter((product) => !query.manageable || query.manageable.split(',').map(normalizeValue).includes(normalizeValue(getProductsManageable(product))))
    .filter((product) => !query.poe || query.poe.split(',').map(normalizeValue).includes(normalizeValue(getProductsPoe(product))))
    .filter((product) => !query.poePlus || query.poePlus.split(',').map(normalizeValue).includes(normalizeValue(getProductsPoePlus(product))))
    .filter((product) => !query.poePlusPlus || query.poePlusPlus.split(',').map(normalizeValue).includes(normalizeValue(getProductsPoePlusPlus(product))))
    .filter((product) => !query.usb || query.usb.split(',').map(normalizeValue).includes(normalizeValue(getProductsUsb(product))))
    .filter((product) => !query.debitVpn || query.debitVpn.split(',').map(normalizeValue).includes(normalizeValue(getProductsDebitVpn(product))))
    .filter((product) => !query.maxTcp || query.maxTcp.split(',').map(normalizeValue).includes(normalizeValue(getProductsMaxTcp(product))))
    .filter((product) => !query.debitFirewall || query.debitFirewall.split(',').map(normalizeValue).includes(normalizeValue(getProductsDebitFirewall(product))))
    .filter((product) => !query.vitesse || query.vitesse.split(',').map(normalizeValue).includes(normalizeValue(getProductsVitesse(product))))
    .filter((product) => !query.typeWifi || query.typeWifi.split(',').map(normalizeValue).includes(normalizeValue(getProductsTypeWifi(product))))
    .filter((product) => !query.antenne || query.antenne.split(',').map(normalizeValue).includes(normalizeValue(getProductsAntenne(product))))
    .filter((product) => !query.lan || query.lan.split(',').map(normalizeValue).includes(normalizeValue(getProductsLan(product))))
    .filter((product) => !query.nebula || query.nebula.split(',').map(normalizeValue).includes(normalizeValue(getProductsNebula(product))));
}
