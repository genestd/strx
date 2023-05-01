import { Link } from "@remix-run/react";

export default function () {
  return (
    <h2 className="text-white w-full">
      You have been securely logged out.
      <Link to="/login" className="ms-4">Log in</Link> to continue
    </h2>
);
}
