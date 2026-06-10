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

      <p>
        <strong>
          Total dépensé :
        </strong>
        {" "}
        {total} FCFA
      </p>

      <p>
        <strong>
          Part idéale :
        </strong>
        {" "}
        {partIdeale.toFixed(0)} FCFA
      </p>

      <hr />

      {membres.map((membre) => {

        const solde =
          totalPaye[membre] -
          partIdeale;

        return (

          <p
            key={membre}
            style={{
              color:
                solde >= 0
                  ? "green"
                  : "red"
            }}
          >
            {membre} :
            {" "}
            {solde.toFixed(0)}
            {" "}
            FCFA
          </p>

        );

      })}

    </div>
  );
}

export default SommeDepense;