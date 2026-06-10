import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DepenseForm from "../components/DepenseForm";
import DepenseList from "../components/DepenseList";
import SommeDepense from "../components/SommeDepense";

import "./Dashboard.css";

function Dashboard() {
  const { id } = useParams();

  const [onglet, setOnglet] = useState("ajouter");

  const [depenses, setDepenses] = useState(() => {
    const data = localStorage.getItem(`depenses_${id}`);
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      `depenses_${id}`,
      JSON.stringify(depenses)
    );
  }, [depenses, id]);

  const membres = [
    "Nadia",
    "Tayou",
    "Evans"
  ];

  const ajouterDepense = (nouvelleDepense) => {
    setDepenses((ancienneListe) => [
      ...ancienneListe,
      nouvelleDepense
    ]);
  };

  return (
    <div className="dashboard">

      <h1>Groupe : {id}</h1>

      <div className="tabs">

        <button
          className={
            onglet === "ajouter"
              ? "active"
              : ""
          }
          onClick={() => setOnglet("ajouter")}
        >
          Ajouter
        </button>

        <button
          className={
            onglet === "historique"
              ? "active"
              : ""
          }
          onClick={() => setOnglet("historique")}
        >
          Historique
        </button>

        <button
          className={
            onglet === "bilan"
              ? "active"
              : ""
          }
          onClick={() => setOnglet("bilan")}
        >
          Bilan
        </button>

      </div>

      <div className="contenu">

        {onglet === "ajouter" && (
          <DepenseForm
            groupId={id}
            membres={membres}
            ajouterDepense={ajouterDepense}
          />
        )}

        {onglet === "historique" && (
          <DepenseList
            depenses={depenses}
          />
        )}

        {onglet === "bilan" && (
          <SommeDepense
            depenses={depenses}
            membres={membres}
          />
        )}

      </div>

    </div>
  );
}

export default Dashboard;