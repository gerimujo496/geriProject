import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./DashaBoard.module.css";
export const Dashaboard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          type="primary"
        >
          Logout
        </Button>
      </div>
      <h1>This is my Project</h1>
    </div>
  );
};
