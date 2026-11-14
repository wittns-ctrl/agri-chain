export const disputeResolvedTemplate = (
  orderId: string,
  outcome: string,
  dashboardUrl: string,
) => {
  return `

    <h1>Dispute Resolved</h1>

    <p>
      Order:
      <b>${orderId}</b>
    </p>

    <p>
      Outcome:
      <b>${outcome}</b>
    </p>

    <a href="${dashboardUrl}">
      View Details
    </a>

  `;
};
