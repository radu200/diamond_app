import { useState } from "react";
import styles from "../styles/main.module.scss";
import Footer from "../components/footer";
import Head from "../components/head";
import UploadButton from "../components/buttons/upload";
import Spinner from "../components/progress/spinner";
import Alert from "../components/messages/alerts";

import { instance_api } from "./api/utils/api_instance";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const onChangeFile = async (e) => {
    try {
      setLoading(true);
      const formData = new FormData();
      const image = e.target.files[0];
      //for preview
      const objectURL = URL.createObjectURL(image);
      setCurrentImage(objectURL);

      formData.append("file", image);

      const url = "/api/upload";

      const res = await instance_api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.status === 200) {
        const { result } = res.data;
        setSuccess(true);
        setLoading(false);
        setCurrentImage(null);
        const data = JSON.parse(result);
        setImageUrls((prev) => [...prev, data]);
      }
    } catch (err) {
      if (err) {
        setLoading(false);
        setError(true);
      }
    }
  };
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <img
          src="/El_logo_colour_12.09.png"
          alt="Vercel Logo"
          className={styles.logo_v2}
        />
        {currentImage ? (
          <img
            className={styles.preview_img}
            src={currentImage}
            alt=""
            width={200}
            height={200}
          />
        ) : null}
        {loading ? <Spinner /> : <UploadButton onChange={onChangeFile} />}
        {error ? <Alert severity="error" msg="Error occurred" /> : null}
        {success ? <Alert severity="success" msg="Success" /> : null}
        {imageUrls.map((d) => (
          <a
            key={d.id}
            href={d.url}
            className={styles.upload_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Image link: {d.name}
          </a>
        ))}
      </main>
      <Footer />
    </div>
  );
}
