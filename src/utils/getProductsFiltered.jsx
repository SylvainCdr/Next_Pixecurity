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

export function getFiltersFromProducts(products) {
  const brands = [...new Set(products.map((product) => product.brand))];

  const minPrice = 0; // Math.min(...products.map((product) => product.price));
  const maxPrice = 6000; ///Math.max(...products.map((product) => product.price));

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

  const colors = products
    .map((product) => getColor(product).trim())
    .filter((value) => value);
  const uniqueColors = Array.from(new Set(colors)).sort();

  const infrarouge = products
    .map((product) => getProductsInfrarouge(product).trim())
    .filter((value) => value);
  const uniqueInfrarouge = Array.from(new Set(infrarouge)).sort(
    (a, b) => a - b
  );

  const distanceInfrarouge = products
    .map((product) => getProductsDistanceInfrarouge(product))
    .filter((value) => value);
  const uniqueDistanceInfrarouge = Array.from(new Set(distanceInfrarouge)).sort(
    (a, b) => a - b
  );

  const installationExt = products
    .map((product) => getProductsInstallationExt(product).trim())
    .filter((value) => value);
  const uniqueInstallationExt = Array.from(new Set(installationExt)).sort(
    (a, b) => a - b
  );

  const nbrePorts = products
    .map((product) => getProductsNbrePorts(product))
    .filter((value) => value);
  const uniqueNbrePorts = Array.from(new Set(nbrePorts)).sort((a, b) => a - b);

  const rackable = products
    .map((product) => getProductsRackable(product).trim())
    .filter((value) => value);
  const uniqueRackable = Array.from(new Set(rackable)).sort((a, b) => a - b);

  const manageable = products
    .map((product) => getProductsManageable(product).trim())
    .filter((value) => value);
  const uniqueManageable = Array.from(new Set(manageable)).sort(
    (a, b) => a - b
  );

  const poe = products
    .map((product) => getProductsPoe(product).trim())
    .filter((value) => value);
  const uniquePoe = Array.from(new Set(poe)).sort((a, b) => a - b);

  const poePlus = products
    .map((product) => getProductsPoePlus(product).trim())
    .filter((value) => value);
  const uniquePoePlus = Array.from(new Set(poePlus)).sort((a, b) => a - b);

  const poePlusPlus = products
    .map((product) => getProductsPoePlusPlus(product).trim())
    .filter((value) => value);
  const uniquePoePlusPlus = Array.from(new Set(poePlusPlus)).sort(
    (a, b) => a - b
  );

  const usb = products
    .map((product) => getProductsUsb(product).trim())
    .filter((value) => value);
  const uniqueUsb = Array.from(new Set(usb)).sort((a, b) => a - b);

  const debitVpn = products
    .map((product) => getProductsDebitVpn(product).trim())
    .filter((value) => value);
  const uniqueDebitVpn = Array.from(new Set(debitVpn)).sort((a, b) => a - b);

  const maxTcp = products
    .map((product) => getProductsMaxTcp(product).trim())
    .filter((value) => value);
  const uniqueMaxTcp = Array.from(new Set(maxTcp)).sort((a, b) => a - b);

  const debitFirewall = products
    .map((product) => getProductsDebitFirewall(product).trim())
    .filter((value) => value);
  const uniqueDebitFirewall = Array.from(new Set(debitFirewall)).sort(
    (a, b) => a - b
  );

  const vitesse = products
    .map((product) => getProductsVitesse(product).trim())
    .filter((value) => value);
  const uniqueVitesse = Array.from(new Set(vitesse)).sort((a, b) => a - b);

  const typeWifi = products
    .map((product) => getProductsTypeWifi(product).trim())
    .filter((value) => value);
  const uniqueTypeWifi = Array.from(new Set(typeWifi)).sort((a, b) => a - b);

  const antenne = products
    .map((product) => getProductsAntenne(product).trim())
    .filter((value) => value);
  const uniqueAntenne = Array.from(new Set(antenne)).sort((a, b) => a - b);

  const lan = products
    .map((product) => getProductsLan(product).trim())
    .filter((value) => value);
  const uniqueLan = Array.from(new Set(lan)).sort((a, b) => a - b);

  const nebula = products
    .map((product) => getProductsNebula(product).trim())
    .filter((value) => value);
  const uniqueNebula = Array.from(new Set(nebula)).sort((a, b) => a - b);

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
    // nbrePorts: {
    //   title: "Nombre de ports",
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
    // vitesse: {
    //   title: "Vitesse",
    //   queryKey: "vitesse",
    //   filters: uniqueVitesse,
    // },
    // typeWifi: {
    //   title: "Type Wifi",
    //   queryKey: "typeWifi",
    //   filters: uniqueTypeWifi,
    // },
    // antenne: {
    //   title: "Antenne",
    //   queryKey: "antenne",
    //   filters: uniqueAntenne,
    // },
    lan: {
      title: "LAN",
      queryKey: "lan",
      filters: uniqueLan,
    },
    // nebula: {
    //   title: "Nebula",
    //   queryKey: "nebula",
    //   filters: uniqueNebula,
    // },
  };
}
export function getProductsFiltered(products, query) {
  const productsFiltered = products
    .filter((product) =>
      query.brand ? query.brand.includes(product.brand) : true
    )
    .filter((product) =>
      query.price
        ? Number(product.price) < Number(query.price) // Changement ici
        : true
    )
    .filter((product) =>
      query.megapixels
        ? query.megapixels.includes(getProductMegapixels(product))
        : true
    )
    .filter((product) =>
      query.imgSec ? query.imgSec.includes(getProductsImgSec(product)) : true
    )
    .filter((product) =>
      query.colors ? query.colors.includes(getColor(product)) : true
    )
    .filter((product) =>
      query.infrarouge
        ? query.infrarouge.includes(getProductsInfrarouge(product))
        : true
    )
    .filter((product) =>
      query.distanceInfrarouge
        ? query.distanceInfrarouge.includes(
            getProductsDistanceInfrarouge(product)
          )
        : true
    )
    .filter((product) =>
      query.installationExt
        ? query.installationExt.includes(getProductsInstallationExt(product))
        : true
    )
    .filter((product) =>
      query.nbrePorts
        ? query.nbrePorts.includes(getProductsNbrePorts(product))
        : true
    )
    .filter((product) =>
      query.rackable
        ? query.rackable.includes(getProductsRackable(product))
        : true
    )
    .filter((product) =>
      query.manageable
        ? query.manageable.includes(getProductsManageable(product))
        : true
    )
    .filter((product) =>
      query.poe ? query.poe.includes(getProductsPoe(product)) : true
    )
    .filter((product) =>
      query.poePlus ? query.poePlus.includes(getProductsPoePlus(product)) : true
    )
    .filter((product) =>
      query.poePlusPlus
        ? query.poePlusPlus.includes(getProductsPoePlusPlus(product))
        : true
    )
    .filter((product) =>
      query.usb ? query.usb.includes(getProductsUsb(product)) : true
    )
    .filter((product) =>
      query.debitVpn
        ? query.debitVpn.includes(getProductsDebitVpn(product))
        : true
    )
    .filter((product) =>
      query.maxTcp ? query.maxTcp.includes(getProductsMaxTcp(product)) : true
    )
    .filter((product) =>
      query.debitFirewall
        ? query.debitFirewall.includes(getProductsDebitFirewall(product))
        : true
    )
    .filter((product) =>
      query.vitesse ? query.vitesse.includes(getProductsVitesse(product)) : true
    )
    .filter((product) =>
      query.typeWifi
        ? query.typeWifi.includes(getProductsTypeWifi(product))
        : true
    )
    .filter((product) =>
      query.antenne ? query.antenne.includes(getProductsAntenne(product)) : true
    )
    .filter((product) =>
      query.lan ? query.lan.includes(getProductsLan(product)) : true
    )
    .filter((product) =>
      query.nebula ? query.nebula.includes(getProductsNebula(product)) : true
    );

  return productsFiltered;
}
