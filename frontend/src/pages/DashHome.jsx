import  { useState, useEffect } from "react";
import "./Home.css"; // pour le design
function DashHome() {
  const [groupes, setGroupes] = useState([]);
  const [nouveauGroupe, setNouveauGroupe] = useState({ nom: "", membres: [] });

  // Simule un chargement initial
  useEffect(() => {
    const dataInitiale = [
      {
        id: 1,
        nom: "Groupe Alpha",
        membres: [
          { nom: "Jean", prenom: "Dupont" },
          { nom: "Marie", prenom: "Durand" },
        ],
      },
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGroupes(dataInitiale);
  }, []);

  function ajouterGroupe() {
        if (!nouveauGroupe.nom) return;
        const id = groupes.length + 1;
        setGroupes([...groupes, { id, ...nouveauGroupe }]);
        setNouveauGroupe({ nom: "", membres: [] });
    }

  const supprimerGroupe = (id) => {
    setGroupes(groupes.filter((g) => g.id !== id));
  };

  return (
    <div className="page-homme">
      <h1>Gestion des Groupes</h1>

      <div className="formulaire">
        <input
          type="text"
          placeholder="Nom du groupe"
          value={nouveauGroupe.nom}
          onChange={(e) =>
            setNouveauGroupe({ ...nouveauGroupe, nom: e.target.value })
          }
        />
        <button onClick={ajouterGroupe}>Ajouter Groupe</button>
      </div>

      <div className="liste-groupes">
        {groupes.map((groupe) => (
          <div key={groupe.id} className="carte-groupe">
            <h2>{groupe.nom}</h2>
            <p>ID : {groupe.id}</p>
            <ul>
              {groupe.membres.map((m, i) => (
                <li key={i}>
                  {m.nom} {m.prenom}
                </li>
              ))}
            </ul>
            <button onClick={() => supprimerGroupe(groupe.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashHome;