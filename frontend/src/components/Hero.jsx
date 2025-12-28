import hero from '../assets/hero.webp';
export default function Hero() {
    return (
        <section style={styles.container}>
            <div style={styles.textSection}>
              <h1 style={styles.title}>Connect Students with Local Jobs</h1>
              <p style={styles.subtitle}>FlexTasks bridges the gap between talented students seeking flexible
              work and clients needing reliable help.</p>
              <div style={styles.imageWrapper}>
                <img src={hero} alt="Hero" style={styles.image}/>
              </div>
            </div>
          </section>
     );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "#d7747e",
    padding: "70px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  },
  textSection: { width: "100%", maxWidth: "1000px" },
  title: { fontSize: "48px", fontWeight: "700", marginBottom: "20px" },
  subtitle: { fontSize: "18px", lineHeight: "1.5", marginBottom: "30px" },
  buttons: { display: "flex", gap: "20px" },
  primaryBtn: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid white",
    background: "white",
    color: "#d7747e",
    cursor: "pointer",
  },
secondaryBtn: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
  imageWrapper: {
    width: "70%",
    maxWidth: "600px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    marginTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: { width: "100%", borderRadius: "14px", display: "block" },
};

