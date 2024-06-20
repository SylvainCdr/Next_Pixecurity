import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function ShopAside({ filters }) {
  const filtersArray = Object.values(filters);
  console.log({ filters, toto: Object.values(filters) });
  return (
    <div className={styles.shopAside_container}>
      {filtersArray.map((filter) => (
        <ProductFilter
          title={filter.title}
          queryKey={filter.queryKey}
          filters={filter.filters}
        />
      ))}

      <PriceFilter />

      {/* {megapixelsValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Mégapixels</h2>
          <ul>
            {megapixelsValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleMegapixelsChange}
                    checked={selectedMegapixels.includes(value)}
                  />
                  {value}
                </label>{" "}
                MP
              </li>
            ))}
          </ul>
        </div>
      )}

      {imgSecValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Images par seconde</h2>
          <ul>
            {imgSecValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleImgSecChange}
                    checked={selectedImgSec.includes(value)}
                  />
                  {value}
                </label>{" "}
                FPS
              </li>
            ))}
          </ul>
        </div>
      )}

      {colorValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Couleur</h2>
          <ul>
            {colorValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleColorChange}
                    checked={selectedColor.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {infrarougeValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Infrarouge</h2>
          <ul>
            {infrarougeValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleInfrarougeChange}
                    checked={selectedInfrarouge.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {distanceInfrarougeValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Distance infrarouge</h2>
          <ul>
            {distanceInfrarougeValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleDistanceInfrarougeChange}
                    checked={selectedDistanceInfrarouge.includes(value)}
                  />
                  {value}
                </label>{" "}
                m
              </li>
            ))}
          </ul>
        </div>
      )}

      {installationExtValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Installation extérieure</h2>
          <ul>
            {installationExtValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleInstallationExtChange}
                    checked={selectedInstallationExt.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nbrePortsValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Nombre de ports</h2>
          <ul>
            {nbrePortsValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleNbrePortsChange}
                    checked={selectedNbrePorts.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {rackableValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Rackable</h2>
          <ul>
            {rackableValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleRackableChange}
                    checked={selectedRackable.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* {manageableValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Manageable</h2>
          <ul>
            {manageableValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleManageableChange}
                    checked={selectedManageable.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* {poeValues.length > 0 && (
        <div className={styles.filter}>
          <h2>PoE</h2>
          <ul>
            {poeValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handlePoeChange}
                    checked={selectedPoe.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {poePlusValues.length > 0 && (
        <div className={styles.filter}>
          <h2>PoE+</h2>
          <ul>
            {poePlusValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handlePoePlusChange}
                    checked={selectedPoePlus.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {poePlusPlusValues.length > 0 && (
        <div className={styles.filter}>
          <h2>PoE++</h2>
          <ul>
            {poePlusPlusValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handlePoePlusPlusChange}
                    checked={selectedPoePlusPlus.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {usbValues.length > 0 && (
        <div className={styles.filter}>
          <h2>USB</h2>
          <ul>
            {usbValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleUsbChange}
                    checked={selectedUsb.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {debitVpnValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Débit VPN</h2>
          <ul>
            {debitVpnValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleDebitVpnChange}
                    checked={selectedDebitVpn.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {maxTcpValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Débit TCP</h2>
          <ul>
            {maxTcpValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleMaxTcpChange}
                    checked={selectedMaxTcp.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {debitFirewallValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Débit Firewall</h2>
          <ul>
            {debitFirewallValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleDebitFirewallChange}
                    checked={selectedDebitFirewall.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {vitesseValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Vitesse</h2>
          <ul>
            {vitesseValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleVitesseChange}
                    checked={selectedVitesse.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* {typeWifiValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Type Wifi</h2>
          <ul>
            {typeWifiValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleTypeWifiChange}
                    checked={selectedTypeWifi.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* {antenneValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Antenne</h2>
          <ul>
            {antenneValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleAntenneChange}
                    checked={selectedAntenne.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* {lanValues.length > 0 && (
        <div className={styles.filter}>
          <h2>LAN</h2>
          <ul>
            {lanValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleLanChange}
                    checked={selectedLan.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nebulaValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Nebula</h2>
          <ul>
            {nebulaValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleNebulaChange}
                    checked={selectedNebula.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

function ProductFilter({ title, queryKey, filters }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!filters?.length) return null;
  return (
    <div className={styles.filter}>
      <h2>{title}</h2>
      <ul>
        {filters.map((value) => (
          <li key={value}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  let values = searchParams.getAll(queryKey);
                  if (e.target.checked) {
                    values.push(value);
                  } else {
                    values = values.filter((b) => String(b) !== String(value));
                  }
                  router.replace({
                    pathname: "/boutique/[category]",
                    query: {
                      ...router.query,
                      [queryKey]: values,
                    },
                  });
                }}
                checked={searchParams.getAll(queryKey).includes(String(value))}
              />
              {value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceFilter() {
  return (
    <div className={styles.filter}>
      <h2>Prix</h2>
      <input
        type="range"
        // min={priceRange.min}
        // max={priceRange.max}
        // value={price}
        // onChange={handlePriceRangeChange}
      />
      {/* <span>{price} € HT</span> */}
    </div>
  );
}
