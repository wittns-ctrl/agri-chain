export const batchFlaggedTemplate = (batchId: string, portalUrl: string) => {
  return `

    <h1>Batch Flagged</h1>

    <p>
      Batch ID:
      <b>${batchId}</b>
    </p>

    <p>
      Marketplace listing suspended.
    </p>

    <a href="${portalUrl}">
      View Audit Record
    </a>

  `;
};
