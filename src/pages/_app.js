import "@/index.css";
import "aos/dist/aos.css";
import useLocalStorage from "use-local-storage";
import { Provider } from "@/Components/appContext";
import { CartProvider } from "@/Components/cartContext";
import Template from "@/Components/Template/Template";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useLocalStorage("user", null);
  return (
    <Provider value={{ user, setUser }}>
      <CartProvider>
        <Template>
          <Component {...pageProps} />
        </Template>
      </CartProvider>
    </Provider>
  );
}
