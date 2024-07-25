import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShopAside({ filters, subcategory }) {
  const filtersArray = Object.values(filters);
  const haveSubcat = Boolean(subcategory?.length);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentParams, setCurrentParams] = useState({});

  useEffect(() => {
    // Synchroniser les paramètres de recherche avec l'état local
    const params = Object.fromEntries(searchParams.entries());
    setCurrentParams(params);
  }, [searchParams]);

  return (
    <div className={styles.shopAside_container}>
      {filtersArray.map((filter, index) => {
        if (filter.queryKey === "price")
          return (
            <PriceFilter
              key={index}
              title={filter.title}
              filters={filter.filters}
              haveSubcat={haveSubcat}
              currentParams={currentParams}
            />
          );

        return (
          <ProductFilter
            key={index}
            title={filter.title}
            queryKey={filter.queryKey}
            filters={filter.filters}
            haveSubcat={haveSubcat}
            currentParams={currentParams}
          />
        );
      })}
    </div>
  );
}

function ProductFilter({ title, queryKey, filters, haveSubcat, currentParams }) {
  const router = useRouter();

  if (!filters?.length) return null;

  return (
    <div className={styles.filter}>
      <h2>{title}</h2>
      <ul>
        {filters.map((value, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  let values = currentParams[queryKey] ? currentParams[queryKey].split(",") : [];
                  if (e.target.checked) {
                    values.push(value);
                  } else {
                    values = values.filter((v) => String(v) !== String(value));
                  }
                  router.push({
                    pathname: haveSubcat
                      ? `/boutique/${router.query.category}/${router.query.subcategory}`
                      : `/boutique/${router.query.category}`,
                    query: {
                      ...currentParams,
                      [queryKey]: values.join(","),
                    },
                  });
                }}
                checked={currentParams[queryKey]?.split(",").includes(String(value))}
              />
              {value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceFilter({ title, filters, haveSubcat, currentParams }) {
  const [price, setPrice] = useState(currentParams.price ? JSON.parse(currentParams.price) : { min: filters?.min, max: filters?.max });
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setPrice(prev => ({
      ...prev,
      [e.target.name]: value
    }));
    router.push({
      pathname: haveSubcat
        ? `/boutique/${router.query.category}/${router.query.subcategory}`
        : `/boutique/${router.query.category}`,
      query: {
        ...currentParams,
        price: JSON.stringify({
          ...price,
          [e.target.name]: value
        }),
      },
    });
  };

  return (
    <div className={styles.filter}>
      <h2>{title}</h2>
      <label>
        Min: 
        <input
          type="number"
          name="min"
          min={filters?.min}
          max={price.max}
          value={price.min}
          onChange={handleChange}
        />
      </label>
      <label>
        Max: 
        <input
          type="number"
          name="max"
          min={price.min}
          max={filters?.max}
          value={price.max}
          onChange={handleChange}
        />
      </label>
      {/* <span>{price.min} € HT minimum - {price.max} € HT maximum</span> */}
    </div>
  );
}
