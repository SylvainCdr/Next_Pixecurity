import styles from "./style.module.scss";

export default function WhatsUpPix() {
  return (
    <div className={styles.whatsUpcontainer}>
      <h1> What's Up Pixecurity?</h1>
      <rssapp-magazine id="HvV50piN6NgpW3kC"></rssapp-magazine>
      <script
        src="https://widget.rss.app/v1/magazine.js"
        type="text/javascript"
        async
      ></script>
    </div>
  );
}
