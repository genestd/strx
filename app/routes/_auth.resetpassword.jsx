import { redirect } from "@remix-run/node";
import { useRouteError, Form, useActionData, useSearchParams } from "@remix-run/react";
import { useId } from 'react'
import { resetPassword } from './utils';
import FormFooter from "../components/auth/FormFooter";
import FormHeader from "../components/auth/FormHeader";
import FormError from "../components/auth/FormError";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const code = form.get("code");
  const password = form.get("password");

  if (
    typeof email !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  await resetPassword(email, code, password)

  return redirect(`/login?email=${encodeURIComponent(email)}`);
};

export function ErrorBoundary() {
  const error = useRouteError();
  const [params] = useSearchParams();
  const defaultEmail = params.get("email")

  return renderForm({ error, defaultEmail })
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
      <FormHeader title="Reset Password" text="Check your email for a code that can be used to reset your password" />
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
          <label className="font-bold text-white" htmlFor="email">Reset Code</label>
          <input
            type="test"
            name="code"
            id="code"
            className="border border-gray-400 py-2 px-4 rounded-md"
            placeholder="123456"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-bold text-white" htmlFor="email">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-400 py-2 px-4 rounded-md"
            placeholder="********"
            required
          />
        </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-secondary text-primary rounded-md py-2 px-4 mt-4 }`}
            >
              Reset Password
            </button>
          </div>
      </Form>
      <FormError error={error} />
      <FormFooter
        cta="Ready to login?"
        links={[{ id: linkId, url: '/login', description: 'Log In'}]}
      />
    </>
);
}
