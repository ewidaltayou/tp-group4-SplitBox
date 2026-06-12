import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DepenseForm from "../components/depenseForm";
import DepenseList from "../components/depenseList";
import SommeDepense from "../components/SommeDepense";
import { getGroupById } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const { id } = useParams();

  const [onglet, setOnglet] = useState("ajouter");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [groupe, setGroupe] = useState(null);

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

  useEffect(() => {
    setLoading(true);
    getGroupById(id)
      .then((response) => {
        const data = response.data;
        setGroupe({
          id: data._id || data.id || id,
          nom: data.name || data.nom || `Groupe ${id}`,
          membres: Array.isArray(data.members)
            ? data.members.map((member) => member || "")
            : Array.isArray(data.membres)
            ? data.membres.map((member) => (member.nom ? member.nom : member))
            : [],
        });
        setError("");
      })
      .catch(() => {
        setError("Impossible de charger les données du groupe.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const membres = groupe?.membres?.length > 0
    ? groupe.membres
    : ["Nadia", "Tayou", "Evans"];

  const ajouterDepense = (nouvelleDepense) => {
    setDepenses((ancienneListe) => [
      ...ancienneListe,
      nouvelleDepense
    ]);
  };

  return (
    <div className="dashboard">

      <h1>Groupe : {groupe?.nom || id}</h1>

      {loading && <div className="dashboard-status">Chargement du groupe...</div>}
      {error && <div className="dashboard-error">{error}</div>}

      <div className="group-members">
        <strong>Membres :</strong>
        <span>{membres.join(" • ")}</span>
      </div>

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