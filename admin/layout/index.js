import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./styles/Body.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const AdminWrapper = ({ children }) => {
  const router = useRouter();
  const [sidebarActive, setSidebarActive] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   router.push("/admin");
  // }, []);


  return (
    <div className={styles.body + " " + styles.light}>
      <Navbar setSidebarActive={setSidebarActive} />
      <div className={styles.content_wrapper}>
        {sidebarActive && <Sidebar setSidebarActive={setSidebarActive} />}
        <div className={styles.body_content}>
          <div className="w-full mx-auto md:p-5 p-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;
