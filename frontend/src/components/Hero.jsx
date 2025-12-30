import hero from '../assets/hero_image.png';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section style={styles.container}>
            <img src={hero} alt="Hero" style={styles.backgroundImage}/>
            <div style={styles.overlay}></div>
            <div style={styles.textSection}>
              <h1 style={styles.title}>Connect Students with Local Jobs</h1>
              <p style={styles.subtitle}>FlexTasks bridges the gap between talented students seeking flexible
              work and clients needing reliable help.</p>
              <div style={styles.buttons}>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <button style={styles.primaryBtn}>Get Started as Student</button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <button style={styles.secondaryBtn}>Post a Job as Client</button>
                </Link>
              </div>
            </div>
          </section>
     );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "70px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  textSection: { width: "100%", maxWidth: "1000px", position: "relative", zIndex: 2 },
  title: { fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "700", marginBottom: "20px" },
  subtitle: { fontSize: "18px", lineHeight: "1.5", marginBottom: "30px" },
  buttons: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" },
  primaryBtn: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid white",
    background: "white",
    color: "#d7747e",
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
secondaryBtn: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background 0.2s, color 0.2s",
  },
};

