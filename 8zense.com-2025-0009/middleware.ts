function setLanguageCookie({ response, cookieName, cookieValue }: { response: Response; cookieName: string; cookieValue: string }) {
  const maxAge = 60 * 60 * 24 * 7; // one week
  // Check if cookie already exists
  if (response.headers.get("Set-Cookie")?.includes(cookieName)) {
    return; // Do not set cookie if it already exists
  }

  // Set the cookie using response headers
  const cookieHeader = `${cookieName}=${cookieValue}; Path=/; Max-Age=${maxAge}; SameSite=Strict`;
  response.headers.set("Set-Cookie", cookieHeader);
}