import { redirect } from "@remix-run/node";
import { Form, useRouteError } from "@remix-run/react";
import { useId } from 'react'
import { register } from './utils'
import FormHeader from "../components/auth/FormHeader";
import FormFooter from "../components/auth/FormFooter";
import FormError from "../components/auth/FormError";

export let action = async ({ request }) => {
  let data = new URLSearchParams(await request.text());
  let email = data.get("email");
  let password = data.get("password");

    await register(email, password);
    return redirect(`/verify?email=${encodeURIComponent(email)}`)

};

export function ErrorBoundary () {
  const error = useRouteError();
  return renderSignup(error);
}

export default function Signup() {
  const linkId = useId();
  return renderSignup({ linkId });
}

function renderSignup({ error, linkId }) {  
  return (
    <>
      <FormHeader title="Sign Up" text="Sign up with an email address. We will only send messages that you have requested to this email" />
      <Form className="space-y-4" method="post">
        <div className="flex flex-col space-y-2">
          <label className="font-bold text-white" htmlFor="email">Email</label>
          <input
            className="border border-gray-400 py-2 px-4 rounded-md"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-bold text-white" htmlFor="password">Password</label>
          <input
            className="border border-gray-400 py-2 px-4 rounded-md"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            className={`bg-secondary text-primary rounded-md py-2 px-4 mt-4 ${
              false ? 'opacity-50 cursor-wait' : ''
            }`}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </Form>
      <FormError error={error} />
      <FormFooter
        cta='Already have an account?'
        links={[
          { id: linkId, url: '/login', description: 'Log In'}
        ]}
      />
    </>
  );
}
