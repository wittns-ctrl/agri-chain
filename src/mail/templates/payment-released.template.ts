export const paymentReleasedTemplate = (
  orderId: string,
  amount: string,
  dashboardUrl: string,
) => {
  return `

    <h1>Payment Released</h1>

    <p>
      Order:
      <b>${orderId}</b>
    </p>

    <p>
      Amount:
      <b>${amount} ETH</b>
    </p>

    <a href="${dashboardUrl}">
      View Earnings
    </a>

  `;
};
