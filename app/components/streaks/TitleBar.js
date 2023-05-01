export default function TitleBar({ title, handleClick }) {
  return (
    <h1 className="text-2xl text-left text-secondary font-bold my-3 px-6 flex justify-between">
      {title}
      <div className="flex justify-end text-base">
        <button
          type="submit"
          className={`bg-secondary text-primary rounded-md py-2 px-4`}
          onClick={handleClick}
        >
          New
        </button>
      </div>
    </h1>
  )
}