import { Link } from '@remix-run/react'
import { BiChart, BiCog, BiCalendarStar, BiInfinite } from 'react-icons/bi'

export default function Nav() {
  return (
    <section className="bg-primary flex flex-col justify-start items-center">
      <Link to="/home/dashboard">
        <div className="text-secondary px-12 py-6 flex flex-col justify-center items-center mt-8">
          <BiChart style={{ fontSize: 54 }} />
          Dashboard
        </div>
      </Link>
      <Link to="/home/profile">
        <div className="text-secondary px-12 py-6 flex flex-col justify-center items-center">
          <BiCog style={{ fontSize: 54 }} />
          Profile
        </div>
      </Link>
      <Link to="/home/calendar">
        <div className="text-secondary px-12 py-6 flex flex-col justify-center items-center">
          <BiCalendarStar style={{ fontSize: 54 }} />
          Calendar
        </div>
      </Link>
      <Link to="/home/streaks">
        <div className="text-secondary px-12 py-6 flex flex-col justify-center items-center">
          <BiInfinite style={{ fontSize: 54 }} />
          Streaks
        </div>
      </Link>
    </section>
  )
}