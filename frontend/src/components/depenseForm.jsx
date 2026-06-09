import { useState } from "react";

function DepenseForm({
  groupId,
  membres,
  ajouterDepense
}) {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState("");
  const [payePar, setPayePar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    ajouterDepense({
      titre,
      montant: Number(montant),
      payePar,
      groupId
    });

    setTitre("");
    setMontant("");
    setPayePar("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
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
        <option value="">
          Choisir un membre
        </option>

        {membres.map((membre) => (
          <option
            key={membre}
            value={membre}
          >
            {membre}
          </option>
        ))}
      </select>

      <button type="submit">
        Ajouter
      </button>

    </form>
  );
}

export default DepenseForm;