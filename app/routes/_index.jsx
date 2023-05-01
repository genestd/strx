import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export let loader = async () => {
  return json({ message: "Hello, world!" });
};

export function meta() {
  return [{
    title: "Habit Tracker",
  }];
}

export default function Index() {
  return (
    <div>
      <h1>Welcome to Habit Tracker</h1>
      <p>
        <Link to="/signup">Sign up here</Link> to start tracking your habits.
      </p>
    </div>
  );
}

// export { default as Signup } from "./auth/signup";
