import styles from "../../styles/alerts.module.scss";

export default function Alert({ severity, msg }) {
  switch (severity) {
    case "success":
      return <div className={styles.success}>{msg}</div>;
    case "error":
      return <div className={styles.error}>{msg}</div>;
    default:
      return null;
  }
}
