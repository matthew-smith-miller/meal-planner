import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [date, setDate] = useState<string>();
  const [diet, setDiet] = useState<string>();
  const [result, setResult] = useState<{ breakfast: string, lunch: string, dinner: string }>();
  const [prompt, setPrompt] = useState<string>('---');
  const diets = [
    '',
    'No restrictions',
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Paleo',
    'Low-Carb',
    'Ron Swanson'
  ];

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
                width={99}
                height={41}
                priority
              />
            </a>
          </div>
        </div>

        <div>
          <div>
            <div className={styles.headerText}>Date
              <span className={styles.userInput}>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </span>
            </div>
            <div className={styles.headerText}>Restrictions
              <span className={styles.userInput}>
                <select onChange={(e) => setDiet(e.target.value)}>
                  {diets.map((d) => (
                    <option value={d} key={d}>{d}</option>
                  ))}
                </select>
              </span>
            </div>
          </div>
          <div className={styles.description}>
            <GenerateButton /> <div id="spinner" className={styles.ldsDualRing}></div>
          </div>
          <div>
            <span className={styles.description}>
              <span className={styles.headerText}>
                Prompt:
            </span>
              {prompt}
            </span>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className={styles.headerText}>
                    Breakfast
                </td>
                  <td className={styles.mealOption}>
                    {result?.breakfast}
                  </td>
                </tr>
                <tr>
                  <td className={styles.headerText}>
                    Lunch
                </td>
                  <td className={styles.mealOption}>
                    {result?.lunch}
                  </td>
                </tr>
                <tr>
                  <td className={styles.headerText}>
                    Dinner
                </td>
                  <td className={styles.mealOption}>
                    {result?.dinner}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.center}>
          <a href="https://github.com/matthew-smith-miller/meal-planner" target="blank">🛰️ repo </a><br />
          <a href="https://www.linkedin.com/in/matthew-smith-miller/" target="blank">👨🏽‍💻 matt</a>
        </div>
      </main>
    </>
  )

  function GenerateButton() {
    async function generateMeals() {
      if (!date || !diet) {
        alert('Please ensure you have selected a date and dietary restrictions!');
        return;
      }
      const spinner = document.getElementById('spinner');
      if (spinner) {
        spinner.style.display = 'inline-block';
      }
      const prompt = generatePrompt({
        date: new Date(date || ''),
        diet: diet || ''
      });
      setPrompt(prompt);

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt
          }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Failed with status ${response.status}!`)
        }
        console.log(`Succeeded with status ${response.status}`);
        console.log(data);
        setResult(JSON.parse(data.result));
        if (spinner) {
          spinner.style.display = 'none';
        }
      } catch (e) {
        console.error(e);
      }
    }

    return (
      <button
        className={styles.generateButton}
        onClick={generateMeals}
      >
        Generate ⚡
      </button>
    )
  }

  function generatePrompt(input: MealPlannerInput) {
    const opening = 'Suggest three meals - breakfast, lunch, and dinner.'
    const diet = processDiet(input.diet);
    const effort = processEffort(input.date);
    const closing = 'Return a JSON object with properties "breakfast", "lunch", and "dinner".'
    return `${opening} ${diet} ${effort} ${closing}`;
  }

  function processEffort(date: Date) {
    if ([0, 6].includes(date.getUTCDay())) {
      return 'This meal plan is for a weekend, so the meals can be a bit more complex.';
    }
    return 'This meal plan is for a weekday, so the meals should be easy to prepare.'
  }

  function processDiet(diet: string) {
    return diet === 'No restrictions'
      ? 'I have no dietary restrictions.'
      : diet === 'Ron Swanson'
        ? 'Please include as much meat in the meal suggestions as possible.'
        : `My diet is ${diet.toLowerCase()}.`
  }
}

interface MealPlannerInput {
  date: Date;
  diet: string
}