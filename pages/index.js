import Link from "next/link";
import styles from "../styles/main.module.scss";
import Footer from "../components/footer";
import Head from "../components/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Everledger</a>
        </h1>
        <Link href="/upload">
          <a className={styles.upload_link}>Upload Images</a>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
