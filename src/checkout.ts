/**
 * Initiates a checkout request and navigates the browser to the checkout URL returned by the server.
 *
 * Sends a POST request to "/api/checkout/vapor75" and, if the response includes a `url` field, assigns it to `window.location.href` to perform a redirect. On failure logs "Mua không thành công:" and the error to the console.
 */
export async function checkout() {
  try {
    const res = await fetch("/api/checkout/vapor75", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  } catch (error) {
    console.error("Mua không thành công:", error);
  }
}