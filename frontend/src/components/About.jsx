export default function About() {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>About FlexTasks</h2>
        <p style={styles.description}>
          FlexTasks is a platform that connects students with local clients for flexible, part-time work opportunities.
          Our mission is to help students earn money while providing reliable help to clients in their community.
        </p>
        <div style={styles.stats}>
          <div style={styles.stat}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={styles.statNumber}>4.7</h3>
            <p style={styles.statText}>Avg. client ratings in Legal</p>
          </div>
          <div style={styles.stat}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 style={styles.statNumber}>700+</h3>
            <p style={styles.statText}>Projects completed</p>
          </div>
          <div style={styles.stat}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4h.01M12 12h4.01" />
            </svg>
            <h3 style={styles.statNumber}>140+</h3>
            <p style={styles.statText}>Places available</p>
          </div>
          <div style={styles.stat}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 style={styles.statNumber}>20</h3>
            <p style={styles.statText}>Skills and specialties</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '80px 20px',
    background: '#f9f9f9',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '60px',
    maxWidth: '800px',
    margin: '0 auto 60px',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px',
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    background: 'white',
    padding: '40px',
    borderRadius: '8px',
  },
  stat: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    width: '48px',
    height: '48px',
    color: '#d7747e',
    marginBottom: '15px',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#d7747e',
    marginBottom: '10px',
  },
  statText: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'left',
  },
};