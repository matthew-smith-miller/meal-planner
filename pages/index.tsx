import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Meel</title>
        <meta name="description" content="An app for generating meal plans" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Welcome to the Meel meal planner
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/meel.png"
                alt="Meel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div>Container
          <div>
            Controls
            <div>Date picker
              <span>
                <input type="date" />
              </span></div>
            <div className={styles.grid}>
              <div className={styles.card}>Veg</div>
              <div className={styles.card}>Vegan</div>
              <div className={styles.card}>Paleo</div>
              <div className={styles.card}>Low-carb</div>
              <div className={styles.card}>Nick Offerman</div>
            </div>
          </div>
          <div className={styles.description}>
            Hi!
        </div>
          <div>
            Meal table
            <table>
              <tr>
                <td>
                  Breakfast:
                </td>
                <td>
                  ...
                </td>
              </tr>
              <tr>
                <td>
                  Lunch:
                </td>
                <td>
                  ...
                </td>
              </tr>
              <tr>
                <td>
                  Dinner:
                </td>
                <td>
                  ...
                </td>
              </tr>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
