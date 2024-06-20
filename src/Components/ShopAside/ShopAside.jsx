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
