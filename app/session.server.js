import { createCookieSessionStorage, redirect } from "@remix-run/node";

const USER_SESSION_ID_TOKEN = "idToken";
const USER_SESSION_REFRESH_TOKEN = "refreshToken"

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getSession(request) {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export async function logout(request) {
  const session = await getSession(request);
  throw redirect('/logout', {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  })
}

export async function createUserSession({ request, idToken, refreshToken }) {
  const session = await getSession(request);
  session.set(USER_SESSION_ID_TOKEN, idToken);
  session.set(USER_SESSION_REFRESH_TOKEN, refreshToken);
  return redirect("/home/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7 // 7 days,
      }),
    },
  });
}

export async function getToken(request) {
  const session = await getSession(request);
  const token = session.get(USER_SESSION_ID_TOKEN);
  return token;
}