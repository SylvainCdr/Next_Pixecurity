import "@/index.css";
import "aos/dist/aos.css";

import { AppProvider } from "@/Components/appContext";
import { CartProvider } from "@/Components/cartContext";
import Template from "@/Components/Template/Template";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <CartProvider>
        <Template>
          <Component {...pageProps} />
        </Template>
      </CartProvider>
    </AppProvider>
  );
}
