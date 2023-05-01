import { Form } from "@remix-run/react";

export default function Footer() {
  return (
    <section className="bg-primary p-2 flex justify-end items-center w-full">
      <Form method="post">
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-secondary text-primary rounded-md py-2 px-4`}
            >
            Log Out
          </button>
        </div>
      </Form>
    </section>
  )
}