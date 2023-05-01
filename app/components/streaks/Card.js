export default function Card({ goal }) {
  return (
    <div className="bg-gray p-3 rounded-lg">
      {goal.name}
    </div>
  )
}