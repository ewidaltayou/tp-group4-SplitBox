function DepenseList({ depenses }) {

  if (depenses.length === 0) {
    return <p>Aucune dépense enregistrée.</p>;
  }

  return (
    <div>

      <h2>Historique des dépenses</h2>

      {depenses.map((depense, index) => (
        <div key={index}>

          <h3>{depense.titre}</h3>

          <p>
            Montant : {depense.montant} FCFA
          </p>

          <p>
            Payé par : {depense.payePar}
          </p>

        </div>
      ))}

    </div>
  );
}

export default DepenseList;