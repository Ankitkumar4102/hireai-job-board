# HireAI — AI-Powered Developer Job Board

A production-ready React frontend for searching developer jobs, saving listings, and generating AI cover letters.

## Tech Stack
- React 18 + React Router v6
- Recharts (charts)
- Lucide React (icons)
- Axios (HTTP)
- OpenWeatherMap API / Adzuna Jobs API
- OpenAI GPT-3.5 (cover letter)
- Vercel (deployment)

## Pages
| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Job listings, search, filter chips |
| Job Detail | `/job/:id` | Full JD, salary, apply + cover letter |
| Saved Jobs | `/saved` | Bookmarked jobs (localStorage) |
| Cover Letter | `/cover-letter` | AI cover letter generator |

## Project Structure
```
src/
  components/
    Navbar.js / .css       ← Top nav with search + mobile menu
    JobCard.js / .css      ← Individual job card with save button
    Skeleton.js / .css     ← Loading shimmer skeletons
  pages/
    Home.js / .css         ← Hero, search bar, filter chips, job grid
    JobDetail.js / .css    ← Full job view with sidebar
    SavedJobs.js / .css    ← Bookmarked jobs
    CoverLetter.js / .css  ← AI cover letter generator
  hooks/
    useJobs.js             ← Job fetching + filter state
  utils/
    api.js                 ← Adzuna API + mock data fallback
    openai.js              ← OpenAI cover letter generation
    helpers.js             ← timeAgo, fmtSalary, localStorage helpers
```

## Resume Bullet Points
```
• Built a 4-page AI job board SPA using React 18 and React Router v6,
  featuring real-time job search, category filtering, and job bookmarking
  with localStorage persistence

• Integrated the Adzuna Jobs API to surface live developer listings with
  keyword and location search, falling back to structured mock data for
  demo stability

• Implemented an AI cover letter generator using OpenAI GPT-3.5 that
  produces personalised, ATS-optimised letters from job descriptions
  in under 5 seconds

• Deployed on Vercel with CI/CD from GitHub — live at hireai.vercel.app
```
