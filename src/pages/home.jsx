import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import heroImg from "../assets/hero.png";     // Groupe
import { FaMoneyBill } from "react-icons/fa";  // Dépenses
import { FaPlus } from "react-icons/fa";       // Ajouter
import { FaTrash } from "react-icons/fa";      // Supprimer
import { FaHome } from "react-icons/fa";       // Accueil
import { FaUserFriends } from "react-icons/fa"; // Membres
import "./Home.css";


function Homme() {
  const [groupes, setGroupes] = useState([]);
  const [nouveauGroupe, setNouveauGroupe] = useState({
    nom: "",
    membres: [],
  });

  useEffect(() => {
    setGroupes([
      {
        id: 1,
        nom: "Groupe Alpha",
        membres: [
          { nom: "Jean", prenom: "Dupont" },
          { nom: "Marie", prenom: "Durand" },
        ],
      },
    ]);
  }, []);

  const ajouterGroupe = () => {
    if (!nouveauGroupe.nom) return;

    setGroupes([
      ...groupes,
      {
        id: Date.now(),
        ...nouveauGroupe,
      },
    ]);

    setNouveauGroupe({
      nom: "",
      membres: [],
    });
  };

  const supprimerGroupe = (id) => {
    setGroupes(groupes.filter((g) => g.id !== id));
  };

  return (
    <div className="page-homme">

      <div className="header">
        <div className="logo">
      <FaUsers size={40} />
        </div>
        <h2>SplitBox</h2>
      </div>

      <section className="hero">
        <div className="hero-text">
          <h1>Gérez les dépenses de groupe sans complications</h1>

          <p>
            SplitBox centralise toutes vos dépenses partagées
            et calcule automatiquement qui doit à qui.
          </p>

          <button className="btn-start">
            Commencer →
          </button>
        </div>

        <div className="hero-image">
      <img src={heroImg} alt="Illustration" />
        </div>
      </section>
      <section className="contenu">
         <div className="groupes">
          {groupes.map((groupe) => (
            <div key={groupe.id} className="carte-groupe">
              <h3>
          <FaBook /> {groupe.nom}
              </h3>

              <ul>
                {groupe.membres.map((membre, index) => (
                  <li key={index}>
                    {membre.nom} {membre.prenom}
                  </li>
                ))}
              </ul>

              <button onClick={ajouterGroupe}>
                 <FaPlus /> Ajouter un groupe
              </button>
            </div>
          ))}
        </div>

        <div className="creation">
          <h2>Créer un groupe</h2>

          <input
            type="text"
            placeholder="Nom du groupe"
            value={nouveauGroupe.nom}
            onChange={(e) =>
              setNouveauGroupe({
                ...nouveauGroupe,
                nom: e.target.value,
              })
            }
          />

          <button onClick={ajouterGroupe}>
            Ajouter un groupe
          </button>
        </div>

      </section>

    </div>
  );
}

export default Homme;