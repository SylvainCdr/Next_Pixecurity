import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function ShopAside({ filters, subcategory }) {
  const filtersArray = Object.values(filters);
  const haveSubcat = Boolean(subcategory?.length);

  return (
    <div className={styles.shopAside_container}>
      {filtersArray.map((filter, index) => {
        if (filter.queryKey === "price")
          return (
            <PriceFilter
              title={filter.title}
              filters={filter.filters}
              haveSubcat={haveSubcat}
            />
          );

        return (
          <ProductFilter
            key={index} // Add a key prop here
            title={filter.title}
            queryKey={filter.queryKey}
            filters={filter.filters}
            haveSubcat={haveSubcat}
          />
        );
      })}
    </div>
  );
}

function ProductFilter({ title, queryKey, filters, haveSubcat }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!filters?.length) return null;

  return (
    <div className={styles.filter}>
      <h2>{title}</h2>
      <ul>
        {filters.map((value, index) => (
          <li key={index}>
            {" "}
            {/* Ensure each item in the list has a unique key */}
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
                    pathname: haveSubcat
                      ? "/boutique/[category]/[subcategory]"
                      : "/boutique/[category]",
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

function PriceFilter({ title, filters, haveSubcat }) {
  const searchParams = useSearchParams();
  const [price, setPrice] = useState(searchParams.get("price") ?? 0);
  const router = useRouter();

  return (
    <div className={styles.filter}>
      <h2>{title}</h2>
      <input
        type="range"
        min={filters?.min}
        max={filters?.max}
        value={price}
        onChange={(e) => {
          const value = e.target.value;
          setPrice(value);
          router.replace({
            pathname: haveSubcat
              ? "/boutique/[category]/[subcategory]"
              : "/boutique/[category]",
            query: {
              ...router.query,
              price: value,
            },
          });
        }}
      />
      <span>{price} € HT</span>
    </div>
  );
}
