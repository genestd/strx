import { Form } from "@remix-run/react";

export default function Calendar() {
  return (
    <div className="flex-1 bg-primary">
      <h1 className="text-2xl text-center text-secondary font-bold mb-6">Calendar</h1>
      <div className="bg-primary w-full h-full flex justify-center items-center">
        <Form className="space-y-4 w-[50%]" method="post">
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-white" htmlFor="email">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-400 py-2 px-4 rounded-md"
              placeholder="Name"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-white" htmlFor="password">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="border border-gray-400 py-2 px-4 rounded-md"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-white text-primary rounded-md py-2 px-4 mt-4 }`}
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
