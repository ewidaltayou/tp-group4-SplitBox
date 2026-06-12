function SommeDepense({ depenses, membres }) {

  const total = depenses.reduce(
    (somme, depense) =>
      somme + depense.montant,
    0
  );

  const partIdeale =
    membres.length > 0
      ? total / membres.length
      : 0;

  const totalPaye = {};

  membres.forEach((membre) => {
    totalPaye[membre] = 0;
  });

  depenses.forEach((depense) => {
    totalPaye[depense.payePar] +=
      depense.montant;
  });

  return (
    <div className="somme-depense">
      <h2>Bilan du groupe</h2>

      <table className="bilan-table">
        <thead>
          <tr>
            <th>Membre</th>
            <th>Total payé (FCFA)</th>
            <th>Part idéale (FCFA)</th>
            <th>Solde (FCFA)</th>
          </tr>
        </thead>
        <tbody>
          {membres.map((membre) => {
            const totalPay = totalPaye[membre] || 0;
            const solde = totalPay - partIdeale;
            return (
              <tr key={membre}>
                <td>{membre}</td>
                <td>{totalPay.toFixed(0)}</td>
                <td>{partIdeale.toFixed(0)}</td>
                <td className={solde >= 0 ? "positif" : "negatif"}>{solde.toFixed(0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SommeDepense;