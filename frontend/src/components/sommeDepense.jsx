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

    if (
      totalPaye[depense.payePar] !==
      undefined
    ) {
      totalPaye[depense.payePar] +=
        depense.montant;
    }

  });

  return (

    <div className="somme-depense">

      <h2>Bilan du groupe</h2>

      <p>
        <strong>Total dépensé :</strong>
        {" "}
        {total} FCFA
      </p>

      <p>
        <strong>Part idéale :</strong>
        {" "}
        {partIdeale.toFixed(0)} FCFA
      </p>

      <hr />

      <div style={{ overflowX: "auto" }}>

        <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }}
>

          <thead>
            <tr>
              <th>Membre</th>
              <th>Total payé</th>
              <th>Part idéale</th>
              <th>Solde</th>
            </tr>
          </thead>

          <tbody>

            {membres.map((membre) => {

              const solde =
                totalPaye[membre] -
                partIdeale;

              return (

                <tr key={membre}>

                  <td>{membre}</td>

                  <td>
                    {totalPaye[membre].toFixed(0)}
                    {" "}
                    FCFA
                  </td>

                  <td>
                    {partIdeale.toFixed(0)}
                    {" "}
                    FCFA
                  </td>

                  <td
                    className={
                      solde >= 0
                        ? "positif"
                        : "negatif"
                    }
                  >
                    {solde.toFixed(0)}
                    {" "}
                    FCFA
                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default SommeDepense;