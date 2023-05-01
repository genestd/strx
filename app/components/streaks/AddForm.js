import { Form } from "@remix-run/react";

export default function AddForm({ closeAction, showForm }) {
  return (
    <Form className={`bg-secondary p-6 rounded-md ${showForm ? 'block' : 'hidden'}`} method="post">
      <div className="flex flex-col space-y-2">
        <label className="font-bold text-white" htmlFor="email">Streak Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-gray-400 py-2 px-4 rounded-md"
          placeholder="Streak name"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-bold text-white" htmlFor="password">Description</label>
        <textarea
          name="description"
          id="description"
          className="border border-gray-400 py-2 px-4 rounded-md"
          placeholder="Description"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-bold text-white" htmlFor="password">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          className="border border-gray-400 py-2 px-4 rounded-md"
          placeholder="StartDate"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`bg-primary text-white rounded-md py-2 px-4 mt-4`}
        >
          Add
        </button>
        <button
          type="button"
          className={`bg-gray text-white rounded-md py-2 px-4 mt-4 ml-4`}
          onClick={closeAction}
        >
          Cancel
        </button>
      </div>
    </Form>
  )
}