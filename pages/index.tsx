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
              <DietButton diet="Vegetarian" />
              <DietButton diet="Vegan" />
              <DietButton diet="Pescatarian" />
              <DietButton diet="Paleo" />
              <DietButton diet="Low-Carb" />
              <DietButton diet="Nick Offerman" />
            </div>
          </div>
          <div className={styles.description}>
            <GenerateButton />
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

function GenerateButton() {
  function generateMeals() {
    console.log('Generating meals');
  }
  return (
    <button
      className={styles.generateButton}
      onClick={generateMeals}
    >
      Generate
    </button>
  )
}

function DietButton({ diet }) {
  return (
    <button className={styles.dietButton}>
      {diet}
    </button>
  )
}

interface MealPlannerInputs {
  date: Date;
  diet: string;
}
