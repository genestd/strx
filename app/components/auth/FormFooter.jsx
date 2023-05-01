import { Link } from '@remix-run/react'

export default function FormFooter({ links, cta }) {
  return (
    <div className="mt-4">
      <span className="text-white">{cta}</span>
      {links.map((link, index) => (
        <span key={`${link.id}${Math.random()}`}>
          <Link
            to={link.url}
            className="ml-2 mr-2 font-bold text-secondary hover:underline"
          >
            {link.description}
          </Link>
          {index < links.length - 1 && <span key={`span-${link.id}${Math.random()}`} className="text-white"> or</span>}
        </span>
      ))}
    </div>
  )
}