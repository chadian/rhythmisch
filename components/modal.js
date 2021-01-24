import FocusLock from "react-focus-lock";
import styles from "../styles/Modal.module.css";

export default function Modal({ children }) {
  return (
    <FocusLock>
      <div role="dialog" aria-modal="true" className={styles.modal}>
        {children}
      </div>
    </FocusLock>
  );
}
