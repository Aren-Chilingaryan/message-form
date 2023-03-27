/* eslint-disable @next/next/no-img-element */

import styles from '@/styles/layout.module.css';

const navigation = [
  { name: "New Message", href: "/", current: false },
  { name: "All Messages", href: "/messages", current: false },
];


const Layout = ({ children }) => {
  return (
    <>
      <div >
        <div className={styles.buttonContainer}>
          {navigation.map((item) => (
            <a
              className={styles.navigatinButton}
              key={item.name}
              href={item.href}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div  >
          <main>
            <div >{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
