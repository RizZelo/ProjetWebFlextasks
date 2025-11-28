import styles from '../styles/HowItWorks.module.css';

export default function HowItWorks(){
    return(
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>How It Works</h2>
                <p className={styles.subtitle}>Simple steps to get started</p>
            
            <div className={styles.cardsContainer}>
                {/*for students card*/}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>For Students</h3>
                    
                    <div className={styles.step}>
                        <div className={styles.number}>1</div>
                        <div className={styles.stepContent}> 
                            <h4 className={styles.stepTitle}>Create Your Profile</h4>
                            <p className={styles.stepText}> Showcase your skills, 
                            availability, and set your hourly rate</p>
                        </div>
                    </div>

                    <div className={styles.step}>
                      <div className={styles.number}>2</div>
                      <div className={styles.stepContent}>
                        <h4 className={styles.stepTitle}>Browse & Apply</h4>
                        <p className={styles.stepText}>
                          Find jobs that match your schedule and skills
                        </p>
                      </div>
                    </div>

                    <div className={styles.step}>
                      <div className={styles.number}>3</div>
                      <div className={styles.stepContent}>
                        <h4 className={styles.stepTitle}>Complete & Get Paid</h4>
                        <p className={styles.stepText}>
                          Finish the job, receive payment, and build your reputation
                        </p>
                      </div>
                    </div>
                </div>

                {/* For Clients Card */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>For Clients</h3>

                    <div className={styles.step}>
                      <div className={styles.number}>1</div>
                      <div className={styles.stepContent}>
                        <h4 className={styles.stepTitle}>Post Your Job</h4>
                        <p className={styles.stepText}>
                          Describe what you need done and when
                        </p>
                      </div>
                    </div>

                    <div className={styles.step}>
                      <div className={styles.number}>2</div>
                      <div className={styles.stepContent}>
                        <h4 className={styles.stepTitle}>Choose Your Student</h4>
                        <p className={styles.stepText}>
                          Review profiles, ratings, and select the best fit
                        </p>
                      </div>
                    </div>

                    <div className={styles.step}>
                      <div className={styles.number}>3</div>
                      <div className={styles.stepContent}>
                        <h4 className={styles.stepTitle}>Rate & Review</h4>
                        <p className={styles.stepText}>
                          Share your experience and help the community
                        </p>
                      </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}