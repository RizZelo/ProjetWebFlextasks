export default function Navbar(){
    return(
        <nav style={styles.nav}>
            <div style={styles.left}>
            <div style={styles.LogoCircular}>FT</div>
            <span style={styles.logoText}>FlexTasks</span>
            </div>
            <ul style={styles.menu}>
                <li>Home</li>
                <li>About</li>
                <li>FAQ</li>
                <li>Contact</li>
            </ul>
            <div style={styles.right}>
                <button style={styles.login}>Login</button>
                <button style={styles.signup}>Sign Up</button>
            </div>
        </nav>
    );
}
const styles ={
    nav:{
        width:"100%",
        padding:"20px 50px",
        display:"flex",
        alignItems:"center",
        justifyContent: "space-between",
        borderBottom:"#fff",
        position: "sticky",
        top:0,
        zIndex: 100,
    },
    left: { 
        display: "flex",
        alignItems:"center",
        gap:"12px"
    },
    logoCircle:{
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#d7747e",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        color: "white",
        fontWeight: "bold",
    },
    logoText: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#d7747e" 
    },
    menu: {
    listStyle: "none",
    display: "flex",
    gap: "40px",
    fontSize: "16px",
    color: "#444",
    },
    right: {
        display: "flex", 
        gap: "12px"
    },
     login: {
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  signup: {
    background: "#d7747e",
    padding: "8px 16px",
    borderRadius: "8px",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
}