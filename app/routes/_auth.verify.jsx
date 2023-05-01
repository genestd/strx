import { redirect } from "@remix-run/node";
import { Form, useSearchParams, useRouteError } from "@remix-run/react";
import { useId } from 'react'
import { verify, resendCode } from './utils'
import FormHeader from "../components/auth/FormHeader";
import FormFooter from "../components/auth/FormFooter";
import FormError from "../components/auth/FormError";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const code = form.get("code");
  const action = form.get("_action")

  if (action === 'verify') {
    if (typeof code !== 'number' && code.toString().length !== 6) {
      throw new Error('Please enter your 6 digit verification code')
    }
    await verify(email, code)
    return redirect(`/dashboard`);
  }

  if (action === 'resend') {
    await resendCode(email)
    return redirect(`/verify?email=${encodeURIComponent(email)}`);
  }

  return null
};

export function ErrorBoundary() {
  const loginLinkId = useId();
  const signupLinkId = useId();
  const [params] = useSearchParams();
  const defaultEmail = params.get("email");
  const error = useRouteError();
  return renderForm({error, defaultEmail, loginLinkId, signupLinkId})
}

export default function VerifyForm() {
  const loginLinkId = useId();
  const signupLinkId = useId();

  const [params] = useSearchParams();
  const defaultEmail = params.get("email");
  const isUnverified = params.get("unverified")
  const error = isUnverified ? { message: "This email has not been verified" } : null

  return renderForm({ error, defaultEmail, loginLinkId, signupLinkId});
}

function renderForm({ error, defaultEmail, loginLinkId, signupLinkId }) {  
  return (
    <>
      <FormHeader title="Verify Email" text="Check your email for a verification code to finish registration" />
      <Form className="space-y-4" method="post">
        <div className="flex flex-col space-y-2">
          <label className="font-bold text-white">Email</label>
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
          <label className="font-bold text-white" htmlFor="code">Verification Code</label>
          <input
            type="text"
            name="code"
            id="code"
            className="border border-gray-400 py-2 px-4 rounded-md"
            placeholder="123456"
          />
        </div>
        <div className="flex justify-end">
          <button
            name="_action"
            value="verify"
            type="submit"
            className={`bg-secondary text-primary rounded-md py-2 px-4 mt-4 w-1/3 flex-grow}`}
          >
            Verify
          </button>
          <button
            name="_action"
            value="resend"
            type="submit"
            className={`bg-secondary text-primary rounded-md py-2 px-4 ms-4 mt-4 w-1/3 flex-grow}`}
          >
            Resend Code
          </button>
        </div>
      </Form>
      <FormError error={error} />
      <FormFooter
        cta="Don't have a verification code?"
        links={[
          { id: loginLinkId, url: '/login', description: 'Log In'},
          { id: signupLinkId, url: '/signup', description: 'Sign Up'},
        ]}
      />
    </>
  );
}
