import { redirect } from "@remix-run/node";
import { useRouteError, Form, useActionData, useSearchParams } from "@remix-run/react";
import { useId } from 'react'
import { login } from './utils';
import { createUserSession } from '../session.server'
import FormFooter from "../components/auth/FormFooter";
import FormHeader from "../components/auth/FormHeader";
import FormError from "../components/auth/FormError";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const result = await login(email, password)
  if (result.code === 'UserNotConfirmedException') {
    return redirect(`/verify?unverified=true&email=${encodeURIComponent(email)}`)
  }
  return createUserSession({
    request,
    idToken: result.idToken.jwtToken,
    refreshToken: result.refreshToken.token
  });
};

export function ErrorBoundary() {
  const error = useRouteError();
  return renderForm({ error })
}

export default function () {
  const data = useActionData();
  const [params] = useSearchParams();
  const defaultEmail = params.get("email")
  const linkId = useId();

  return renderForm({ data, linkId, defaultEmail })
}

function renderForm({ error, linkId, defaultEmail }) {
  return (
    <>
      <FormHeader title="Log In" text="Log in to start tracking your streaks" />
      <Form className="space-y-4" method="post">
        <div className="flex flex-col space-y-2">
          <label className="font-bold text-white" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={defaultEmail}
            className="border border-gray-400 py-2 px-4 rounded-md"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-bold text-white" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-400 py-2 px-4 rounded-md"
            placeholder="Password"
            required
          />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-secondary text-primary rounded-md py-2 px-4 mt-4 }`}
            >
              Log In
            </button>
          </div>
      </Form>
      <FormError error={error} />
      <FormFooter
        cta="Don't have an account?"
        links={[{ id: linkId, url: '/signup', description: 'Sign Up'}]}
      />
    </>
);
}
