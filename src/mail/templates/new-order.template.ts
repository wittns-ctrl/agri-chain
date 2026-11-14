export const newOrderTemplate = (
  orderId: string,
  quantity: string,
  dashboardUrl: string,
) => {
  return `

    <h1>New Order Placed</h1>

    <p>
      Order ID:
      <b>${orderId}</b>
    </p>

    <p>
      Quantity:
      <b>${quantity}</b>
    </p>

    <p>
      Payment is secured in escrow.
    </p>

    <a href="${dashboardUrl}">
      View Order
    </a>

  `;
};
