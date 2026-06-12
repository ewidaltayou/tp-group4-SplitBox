import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [members, setMembers] = useState([""]);

  useEffect(() => {
    document.title = "SplitBox — Accueil";

    fetch("http://localhost:5000/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data || []))
      .catch((error) => {
        console.error("Erreur chargement groupes :", error);
      });
  }, []);

  const handleAddGroup = async (event) => {
    event.preventDefault();
    if (!newGroup.trim()) {
      return;
    }

    const filteredMembers = members.filter((member) => member.trim() !== "");
    const tempId = `temp-${Date.now()}`;
    const nextGroup = {
      id: tempId,
      _id: tempId,
      title: newGroup.trim(),
      members: filteredMembers,
      description:
        filteredMembers.length > 0
          ? `Membres : ${filteredMembers.join(", ")}`
          : "Cliquez pour voir votre tableau de bord",
      saving: true
    };

    setGroups((current) => [nextGroup, ...current]);
    setNewGroup("");
    setMembers([""]);

    const body = {
      name: nextGroup.title,
      members: nextGroup.members
    };

    try {
      const response = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Impossible d'ajouter le groupe");
      }

      const group = await response.json();
      const savedGroup = {
        _id: group._id,
        title: group.name,
        members: group.members,
        description:
          group.members.length > 0
            ? `Membres : ${group.members.join(", ")}`
            : "Cliquez pour voir votre tableau de bord"
      };

      setGroups((current) =>
        current.map((item) =>
          item.id === tempId || item._id === tempId ? savedGroup : item
        )
      );
    } catch (error) {
      setGroups((current) =>
        current.map((item) =>
          item.id === tempId || item._id === tempId
            ? { ...item, saving: false, saveFailed: true }
            : item
        )
      );
      console.error(error);
    }
  };

  const addMemberField = () => {
    setMembers((current) => [...current, ""]);
  };

  const handleMemberChange = (index, value) => {
    setMembers((current) =>
      current.map((member, memberIndex) =>
        memberIndex === index ? value : member
      )
    );
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="brand-name">SplitBox</span>
          <h1>Gérez les dépenses de groupe sans complications</h1>
          <p>
            SplitBox centralise toutes vos dépenses partagées et calcule
            automatiquement qui doit quoi. Simplifiez la gestion financière de
            votre groupe en quelques clics.
          </p>
          <button type="button" className="hero-button">
            Commencer <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-card">
            <div className="hero-visual-icon">📚</div>
            <div className="hero-visual-text">
              Votre gestion de groupe claire et rapide
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="groups-column">
          <div className="groups-header">
            <h2>Groupes</h2>
          </div>
          {groups.map((group) => {
            const groupId = group._id || group.id;
            const title = group.title || group.name || "Groupe";
            const membersList = group.members || [];
            const description =
              group.description ||
              (membersList.length > 0
                ? `Membres : ${membersList.join(", ")}`
                : "Cliquez pour voir votre tableau de bord");

            return (
              <article
                key={groupId}
                className="group-card group-card-clickable"
                onClick={() => navigate(`/${groupId}`, { state: { group } })}
              >
                <div className="group-card-title">{title}</div>
                <div className="group-card-description">{description}</div>
                {group.saving && <div className="saving-label">Enregistrement en cours...</div>}
                {group.saveFailed && <div className="error-label">Échec de l'enregistrement</div>}
              </article>
            );
          })}
        </div>

        <aside className="group-form-panel">
          <form className="group-form" onSubmit={handleAddGroup}>
            <div className="form-field">
              <label htmlFor="group-name">Nom du groupe :</label>
              <input
                id="group-name"
                value={newGroup}
                onChange={(event) => setNewGroup(event.target.value)}
                placeholder="Nom du groupe"
              />
            </div>
            {members.map((member, index) => (
              <div className="form-field member-field" key={index}>
                <div>
                  <label htmlFor={`member-name-${index}`}>
                    Membre {index + 1} :
                  </label>
                  <input
                    id={`member-name-${index}`}
                    value={member}
                    onChange={(event) =>
                      handleMemberChange(index, event.target.value)
                    }
                    placeholder="Nom du membre"
                  />
                </div>
                {index === members.length - 1 && (
                  <button
                    type="button"
                    className="member-add-button"
                    aria-label="Ajouter un membre"
                    onClick={addMemberField}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
            <button type="submit" className="submit-button" disabled={!newGroup.trim()}>
              Ajouter
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

export default Home;
