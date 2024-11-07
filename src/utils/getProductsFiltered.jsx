const normalizeValue = (value) => {
  if (typeof value === 'string') {
    return value.trim().toLowerCase().replace(/\s+/g, ''); // Supprimer tous les espaces
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
const getProductsDistanceInfrarouge = (product) => {
  const value = product.details?.distanceInfrarouge || "0";
  const numericValue = parseFloat(value.replace(/[^\d.]/g, '')); // Supprimer tous les caractères non numériques sauf le point
  return isNaN(numericValue) ? 0 : numericValue;
};const getProductsInstallationExt = (product) => product.details?.installationExt || "";
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
  const uniqueDistanceInfrarouge = getUniqueValues(products, 'distanceInfrarouge', getProductsDistanceInfrarouge)
  .filter(value => value !== '0');
    const uniqueInstallationExt = getUniqueValues(products, 'installationExt', getProductsInstallationExt).filter(Boolean);
  const uniqueRackable = getUniqueValues(products, 'rackable', getProductsRackable).filter(Boolean);
  const uniqueManageable = getUniqueValues(products, 'manageable', getProductsManageable).filter(Boolean);
  const uniquePoe = getUniqueValues(products, 'poe', getProductsPoe).filter(Boolean);
  const uniquePoePlus = getUniqueValues(products, 'poePlus', getProductsPoePlus).filter(Boolean);
  const uniquePoePlusPlus = getUniqueValues(products, 'poePlusPlus', getProductsPoePlusPlus).filter(Boolean);
  

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

  const filterConditions = [
    { key: "brand", getter: (product) => normalizeValue(product.brand) },
    { key: "subcategory", getter: getProductSubcategory },
    { key: "megapixels", getter: getProductMegapixels },
    { key: "imgSec", getter: getProductsImgSec },
    { key: "couleur", getter: getColor },
    { key: "infrarouge", getter: getProductsInfrarouge },
    { key: "distanceInfrarouge", getter: getProductsDistanceInfrarouge },
    { key: "installationExt", getter: getProductsInstallationExt },
    { key: "nbrePorts", getter: getProductsNbrePorts },
    { key: "rackable", getter: getProductsRackable },
    { key: "manageable", getter: getProductsManageable },
    { key: "poe", getter: getProductsPoe },
    { key: "poePlus", getter: getProductsPoePlus },
    { key: "poePlusPlus", getter: getProductsPoePlusPlus },
    { key: "usb", getter: getProductsUsb },
    { key: "debitVpn", getter: getProductsDebitVpn },
    { key: "maxTcp", getter: getProductsMaxTcp },
    { key: "debitFirewall", getter: getProductsDebitFirewall },
  ];

  return products
    .filter((product) => !priceRange.min || Number(product.price) >= Number(priceRange.min))
    .filter((product) => !priceRange.max || Number(product.price) <= Number(priceRange.max))
    .filter((product) => {
      return filterConditions.every(({ key, getter }) => {
        const queryValue = query[key];
        if (!queryValue) return true;
        const normalizedValues = queryValue.split(',').map(normalizeValue);
        return normalizedValues.includes(normalizeValue(getter(product)));
      });
    });
}

