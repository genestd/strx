export default function FormHeader({ title, text }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-white">{title}</h1>
      <div className="text-white py-5 h-[100px]">{text}</div>
    </>
  )
}
