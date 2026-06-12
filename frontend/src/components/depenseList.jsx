
function DepenseList({ depenses }) {

  if (!depenses || depenses.length === 0) {
    return <p>Aucune dépense enregistrée.</p>;
  }

  return (
    <div className="depense-list">
      <h2>Historique des dépenses</h2>
      <table>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Montant (FCFA)</th>
            <th>Payé par</th>
          </tr>
        </thead>
        <tbody>
          {depenses.map((depense, index) => (
            <tr key={index}>
              <td>{depense.libelle}</td>
              <td>{depense.montant}</td>
              <td>{depense.payePar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepenseList;

