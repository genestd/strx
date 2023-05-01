import { Outlet } from "@remix-run/react";
import { getToken } from "../session.server";
import { json, redirect } from "@remix-run/node";

export async function loader({ request }) {
  const token = await getToken(request);
  if (token) return redirect("/home/dashboard");
  return json({});
}

export default function Auth() {
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center">
      <div className="max-w-md max-sm:max-w-[90%] w-full mx-auto p-6">
        <Outlet />
      </div>
    </div>
  )
}