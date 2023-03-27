import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Form from "./components/ui/messageForm";
import Layout from "../components/layout";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={styles.container} >
        <Layout>
          <Form />
        </Layout>
      </div>
    </>
  )
}
