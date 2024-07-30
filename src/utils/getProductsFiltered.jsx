const normalizeValue = (value) => {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }
  return ''; // Valeur par défaut si ce n'est pas une chaîne
};

const getProductMegapixels = (product) => parseInt(product.details?.megapixels || 0);
const getProductsImgSec = (product) => parseInt(product.details?.imgSec || 0);
const getColor = (product) => product.details?.couleur || "";
const getProductsInfrarouge = (product) => product.details?.infrarouge || "";
const getProductsDistanceInfrarouge = (product) => parseInt(product.details?.distanceInfrarouge || 0);
const getProductsInstallationExt = (product) => product.details?.installationExt || "";
const getProductsNbrePorts = (product) => parseInt(product.details?.nbrePorts || 0);
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

const getUniqueValues = (products, key, parser = (x) => x) => {
  return Array.from(
    new Set(
      products
        .map((product) => normalizeValue(parser(product, key)))
        .filter((value) => value !== '') // Filtrer les chaînes vides
    )
  ).sort((a, b) => (typeof a === 'string' ? a.localeCompare(b) : a - b));
};

export function getFiltersFromProducts(products) {
  const brands = Array.from(new Set(products.map((product) => normalizeValue(product.brand))));

  const prices = products.map((product) => parseFloat(product.price) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const uniqueMegapixels = getUniqueValues(products, 'megapixels', getProductMegapixels);
  const uniqueImgSec = getUniqueValues(products, 'imgSec', getProductsImgSec);
  const uniqueColors = getUniqueValues(products, 'couleur', getColor);
  const uniqueInfrarouge = getUniqueValues(products, 'infrarouge', getProductsInfrarouge);
  const uniqueDistanceInfrarouge = getUniqueValues(products, 'distanceInfrarouge', getProductsDistanceInfrarouge);
  const uniqueInstallationExt = getUniqueValues(products, 'installationExt', getProductsInstallationExt);
  const uniqueNbrePorts = getUniqueValues(products, 'nbrePorts', getProductsNbrePorts);
  const uniqueRackable = getUniqueValues(products, 'rackable', getProductsRackable);
  const uniqueManageable = getUniqueValues(products, 'manageable', getProductsManageable);
  const uniquePoe = getUniqueValues(products, 'poe', getProductsPoe);
  const uniquePoePlus = getUniqueValues(products, 'poePlus', getProductsPoePlus);
  const uniquePoePlusPlus = getUniqueValues(products, 'poePlusPlus', getProductsPoePlusPlus);
  const uniqueUsb = getUniqueValues(products, 'usb', getProductsUsb);
  const uniqueDebitVpn = getUniqueValues(products, 'debitVpn', getProductsDebitVpn);
  const uniqueMaxTcp = getUniqueValues(products, 'maxTcp', getProductsMaxTcp);
  const uniqueDebitFirewall = getUniqueValues(products, 'debitFirewall', getProductsDebitFirewall);
  const uniqueVitesse = getUniqueValues(products, 'vitesse', getProductsVitesse);
  const uniqueTypeWifi = getUniqueValues(products, 'typeWifi', getProductsTypeWifi);
  const uniqueAntenne = getUniqueValues(products, 'antenne', getProductsAntenne);
  const uniqueLan = getUniqueValues(products, 'lan', getProductsLan);
  const uniqueNebula = getUniqueValues(products, 'nebula', getProductsNebula);

  return {
    brand: {
      title: 'Marques',
      queryKey: 'brand',
      filters: brands,
    },
    price: {
      title: 'Prix',
      queryKey: 'price',
      filters: {
        min: minPrice,
        max: maxPrice,
      },
    },
    megapixels: {
      title: 'Mégapixels',
      queryKey: 'megapixels',
      filters: uniqueMegapixels,
    },
    imgSec: {
      title: 'Images par seconde',
      queryKey: 'imgSec',
      filters: uniqueImgSec,
    },
    colors: {
      title: 'Couleurs',
      queryKey: 'colors',
      filters: uniqueColors,
    },
    infrarouge: {
      title: 'Infrarouge',
      queryKey: 'infrarouge',
      filters: uniqueInfrarouge,
    },
    distanceInfrarouge: {
      title: 'Distance infrarouge',
      queryKey: 'distanceInfrarouge',
      filters: uniqueDistanceInfrarouge,
    },
    installationExt: {
      title: 'Installation extérieure',
      queryKey: 'installationExt',
      filters: uniqueInstallationExt,
    },
    nbrePorts: {
      title: 'Nombre de ports',
      queryKey: 'nbrePorts',
      filters: uniqueNbrePorts,
    },
    rackable: {
      title: 'Rackable',
      queryKey: 'rackable',
      filters: uniqueRackable,
    },
    manageable: {
      title: 'Manageable',
      queryKey: 'manageable',
      filters: uniqueManageable,
    },
    poe: {
      title: 'PoE',
      queryKey: 'poe',
      filters: uniquePoe,
    },
    poePlus: {
      title: 'PoE+',
      queryKey: 'poePlus',
      filters: uniquePoePlus,
    },
    poePlusPlus: {
      title: 'PoE++',
      queryKey: 'poePlusPlus',
      filters: uniquePoePlusPlus,
    },
    usb: {
      title: 'USB',
      queryKey: 'usb',
      filters: uniqueUsb,
    },
    debitVpn: {
      title: 'Débit VPN',
      queryKey: 'debitVpn',
      filters: uniqueDebitVpn,
    },
    maxTcp: {
      title: 'Débit TCP',
      queryKey: 'maxTcp',
      filters: uniqueMaxTcp,
    },
    debitFirewall: {
      title: 'Débit Firewall',
      queryKey: 'debitFirewall',
      filters: uniqueDebitFirewall,
    },
    vitesse: {
      title: 'Vitesse',
      queryKey: 'vitesse',
      filters: uniqueVitesse,
    },
    typeWifi: {
      title: 'Type Wifi',
      queryKey: 'typeWifi',
      filters: uniqueTypeWifi,
    },
    antenne: {
      title: 'Antenne',
      queryKey: 'antenne',
      filters: uniqueAntenne,
    },
    lan: {
      title: 'LAN',
      queryKey: 'lan',
      filters: uniqueLan,
    },
    nebula: {
      title: 'Nebula',
      queryKey: 'nebula',
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
      console.error('Error parsing price range:', error);
    }
  }

  return products
    .filter((product) => !query.brand || query.brand.split(',').map(normalizeValue).includes(normalizeValue(product.brand)))
    .filter((product) => !priceRange.min || Number(product.price) >= Number(priceRange.min))
    .filter((product) => !priceRange.max || Number(product.price) <= Number(priceRange.max))
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
