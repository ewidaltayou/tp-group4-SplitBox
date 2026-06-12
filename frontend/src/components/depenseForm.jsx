import { useState } from "react";

function DepenseForm({
  groupId,
  membres,
  ajouterDepense
}) {
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
  const [payePar, setPayePar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    ajouterDepense({
      libelle,
      montant: Number(montant),
      payePar,
      groupId
    });

    setLibelle("");
    setMontant("");
    setPayePar("");
  };

  return (
    <div className="depense-form">
      <h2>Ajouter une dépense</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Libelle"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Montant"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />

        <select
          value={payePar}
          onChange={(e) => setPayePar(e.target.value)}
          required
        >
          <option value="">Payer par:</option>

          {membres.map((membre) => (
            <option key={membre} value={membre}>
              {membre}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter</button>

      </form>
    </div>
  );
}

export default DepenseForm;