export default function Modal({ children }) {
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-primary/80 flex justify-center items-center">
      <div className="w-[80%] md:w-[50%]">
        {children}
      </div>
    </div>
  )
}