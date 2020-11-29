import styles from "../styles/main.module.scss";
import Footer from "../components/footer";
import Head from "../components/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Everledger</span>
        </h1>
        <a href="/upload" className={styles.upload_link}>
          Upload Images
        </a>
      </main>

      <Footer />
    </div>
  );
}
