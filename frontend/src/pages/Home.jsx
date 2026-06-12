import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups, createGroup } from "../services/api";
import charingImage from "../assets/charing.jpeg";
import logoIcon from "../assets/png.jpeg";
import "./Home.css";

const STORAGE_KEY = "splitbox_home_groups";

function Home() {
  const [groupes, setGroupes] = useState([]);
  const [nouveauGroupe, setNouveauGroupe] = useState({
    nom: "",
    membres: [],
  });
  const [membreNom, setMembreNom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeGroup = (group) => ({
    id: group._id || group.id || Date.now(),
    nom: group.name || group.nom || "",
    membres:
      group.members?.map((member) => ({ nom: member })) ||
      group.membres ||
      [],
  });

  useEffect(() => {
    setLoading(true);
    const savedGroups = (() => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (e) {
        return [];
      }
    })();

    getGroups()
      .then((response) => {
        const fetched = Array.isArray(response.data)
          ? response.data.map(normalizeGroup)
          : [];
        const merged = [
          ...fetched,
          ...savedGroups.filter((localGroup) =>
            !fetched.some((fetchedGroup) => fetchedGroup.id === localGroup.id)
          ),
        ];
        setGroupes(merged);
        setError("");
      })
      .catch(() => {
        setGroupes(savedGroups);
        setError("Impossible de charger les groupes depuis le backend. affichage local activé.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groupes));
  }, [groupes]);

  const ajouterMembre = () => {
    const nom = membreNom.trim();
    if (!nom) return;

    setNouveauGroupe((prev) => ({
      ...prev,
      membres: [...prev.membres, { nom }],
    }));
    setMembreNom("");
  };

  const ajouterGroupe = () => {
    if (!nouveauGroupe.nom) return;

    const payload = {
      name: nouveauGroupe.nom,
      members: nouveauGroupe.membres.map((m) => m.nom),
    };

    setLoading(true);
    createGroup(payload)
      .then((response) => {
        const created = normalizeGroup(response.data);
        setGroupes((prev) => [...prev, created]);
        setNouveauGroupe({ nom: "", membres: [] });
        setMembreNom("");
        setError("");
      })
      .catch(() => {
        const fallbackGroup = {
          id: Date.now(),
          nom: nouveauGroupe.nom,
          membres: [...nouveauGroupe.membres],
        };
        setGroupes((prev) => [...prev, fallbackGroup]);
        setNouveauGroupe({ nom: "", membres: [] });
        setMembreNom("");
        setError("Impossible de créer le groupe sur le backend. Il est ajouté localement.");
      })
      .finally(() => setLoading(false));
  };

  const navigate = useNavigate();

  const supprimerGroupe = (id) => {
    setGroupes(groupes.filter((g) => g.id !== id));
  };

  return (
    <div className="page-homme">

      <div className="header">
        <div className="logo">
          <img src={logoIcon} alt="SplitBox logo" />
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

          <button className="btn-start"  >
            Commencer →
          </button>
        </div>

        <div className="hero-image">
          <img src={charingImage} alt="Illustration SplitBox" />
        </div>
      </section>
      <section className="contenu">
        <div className="status-bar">
          {loading && <div className="status-message">Chargement en cours...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="groupes">
          {groupes.length === 0 && !loading && (
            <div className="empty-message">Aucun groupe trouvé.</div>
          )}

          {groupes.map((groupe) => (
            <div key={groupe.id} className="carte-groupe">
              <h3>{groupe.nom}</h3>

              <ul>
                {groupe.membres.map((membre, index) => (
                  <li key={index}>{membre.nom || membre}</li>
                ))}
              </ul>

              <button onClick={() => navigate(`/${groupe.id}`)}>
                voir groupe
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
              setNouveauGroupe((prev) => ({ ...prev, nom: e.target.value }))
            }
          />

          <input
            type="text"
            placeholder="Nom du membre"
            value={membreNom}
            onChange={(e) => setMembreNom(e.target.value)}
          />

          <button type="button" onClick={ajouterMembre}>
            Ajouter un membre
          </button>

          {nouveauGroupe.membres.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong>Membres ajoutés:</strong>
              <ul>
                {nouveauGroupe.membres.map((membre, index) => (
                  <li key={index}>{membre.nom}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <button className="btn-start" onClick={ajouterGroupe}>
              Créer
            </button>
          </div>
        </div>
          
      </section>

    </div>
  );
}

export default Home;