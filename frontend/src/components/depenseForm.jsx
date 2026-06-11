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
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Libellé"
        value={libelle}
        onChange={(e) =>
          setLibelle(e.target.value)
        }
        required
      />

      <input
        type="number"
        placeholder="Montant"
        value={montant}
        onChange={(e) =>
          setMontant(e.target.value)
        }
        required
      />

      <select
        value={payePar}
        onChange={(e) =>
          setPayePar(e.target.value)
        }
        required
      >
        <option value="">
           Payé par
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