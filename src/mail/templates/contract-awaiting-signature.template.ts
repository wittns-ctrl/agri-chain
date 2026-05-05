export const contractAwaitingSignatureTemplate = (
  crop: string,
  quantity: string,
  price: string,
  schedule: string,
  dashboardUrl: string,
) => {
  return `

    <h1>B2B Contract Awaiting Signature</h1>

    <p>Crop: <b>${crop}</b></p>

    <p>Quantity: <b>${quantity}</b></p>

    <p>Price: <b>${price}</b></p>

    <p>Schedule: <b>${schedule}</b></p>

    <a href="${dashboardUrl}">
      Review Contract
    </a>

  `;
};
