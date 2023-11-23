export const request = async (url, method, data) => {
  const res = await fetch(url, {
    method: method ? method : "GET",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: data ? JSON.stringify(data) : undefined,
  });
  return await res.json();
};
