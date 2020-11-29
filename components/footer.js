import styles from "../styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img
        src="/El_logo_colour_12.09.png"
        alt="Vercel Logo"
        className={styles.logo}
      />
    </footer>
  );
}
