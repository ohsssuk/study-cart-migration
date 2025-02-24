import Cookies from "js-cookie";

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCustomerId() {
  const cookieName = "customer-id";

  let customerId = Cookies.get(cookieName);

  if (!customerId) {
    customerId = crypto.randomUUID();
    Cookies.set(cookieName, customerId, { expires: 1 });
  }

  return customerId;
}
