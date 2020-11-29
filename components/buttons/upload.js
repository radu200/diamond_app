import styles from "../../styles/upload_button.module.scss";

export default function UploadButton({ onChange }) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        name="file"
        id="file"
        className={styles.inputfile}
        onChange={onChange}
      />
      <label htmlFor="file">Upload</label>
    </>
  );
}
