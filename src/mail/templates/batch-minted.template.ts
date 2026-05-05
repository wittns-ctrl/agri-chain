export const batchMintedTemplate = (
  batchName: string,
  tokenId: string,
  qrUrl: string,
) => {
  return `
<h1>Batch Minted Successfully</h1>

    <p>
      Batch:
      <b>${batchName}</b>
    </p>

    <p>
      Token ID:
      <b>${tokenId}</b>
    </p>

    <a href="${qrUrl}">
      Download QR Code
    </a>

`;
};
