import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { MealPlannerInput } from './api/generate'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { setDefaultResultOrder } from 'dns/promises'

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [date, setDate] = useState();
  const [result, setResult] = useState<{ breakfast: string, lunch: string, dinner: string }>();

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
                src="/meel-logo.png"
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
              <DietButton diet="No restrictions" />
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
            Meals
            <table>
              <tbody>
                <tr>
                  <td>
                    Breakfast:
                </td>
                  <td>
                    {result?.breakfast}
                  </td>
                </tr>
                <tr>
                  <td>
                    Lunch:
                </td>
                  <td>
                    {result?.lunch}
                  </td>
                </tr>
                <tr>
                  <td>
                    Dinner:
                </td>
                  <td>
                    {result?.dinner}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )

  function GenerateButton() {
    async function generateMeals() {
      console.log('Generating meals');
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: {
              date: new Date('2023-02-11'),
              diet: 'Vegetarian',
              adventurousness: 0.7
            } as MealPlannerInput
          }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Failed with status ${response.status}!`)
        }
        console.log(`Succeeded with status ${response.status}`);
        console.log(data);
        setResult(JSON.parse(data.result));
      } catch (e) {
        console.error(e);
      }
    }

    return (
      <button
        className={styles.generateButton}
        onClick={generateMeals}
      >
        Go
      </button>
    )
  }
}


function DietButton({ diet }: { diet: string }) {
  return (
    <button className={styles.dietButton}>
      {diet}
    </button>
  )
}
