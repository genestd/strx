import { Outlet } from "@remix-run/react";
import { getToken, logout } from "../session.server";
import { json, redirect } from "@remix-run/node";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Nav from "../components/home/Nav";

import styles from "../styles/home.css";
export const links = () => [
  { rel: "stylesheet", href: styles },
];


export async function loader({ request }) {
  const token = await getToken(request);
  if (!token) return redirect("/login");
  return json({});
}

export async function action({request}) {
  await logout(request);
  return json({})
}
  
export default function Home() {
  return (
    <>
      <div className="h-screen bg-primary flex flex-col justify-between items-center align-stretch overflow:hidden">
        <Header />
        <div className="w-full h-[100%] flex justify-between overflow-hidden">
          <Nav />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}