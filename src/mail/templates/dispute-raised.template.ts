export const disputeRaisedTemplate = (
  orderId: string,
  deadline: string,
  dashboardUrl: string,
) => {
  return `

    <h1>Dispute Raised</h1>

    <p>
      Order:
      <b>${orderId}</b>
    </p>

    <p>
      Payment is frozen until resolved.
    </p>

    <p>
      Evidence deadline:
      <b>${deadline}</b>
    </p>

    <a href="${dashboardUrl}">
      Upload Evidence
    </a>

  `;
};
