// Composant qui permet de gérer le chargement de la page lors de la navigation entre les pages
// Ce loader est affiché en haut de la page sur la page : Products

import { useEffect, useState } from "react";
import Router from "next/router";

export const useRouterLoading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);
  return loading;
};
