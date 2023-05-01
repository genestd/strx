export default function FormError({ error }) {
  return (
      error && <p className={`text-orange font-semibold mt-4 ${error ? '' : 'invisible'}`}>&#x26A0;&#xFE0F; {error.message}</p>
  )
}