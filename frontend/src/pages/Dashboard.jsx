import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const { id } = useParams();
  const location = useLocation();
  const group = location.state?.group;
  const title = group?.title ?? (id ? `Groupe ${id}` : "Groupe #");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState(group?.members?.[0] ?? "");
  const [activeTab, setActiveTab] = useState("Ajouter");
  const [expenses, setExpenses] = useState([]);
  const members = group?.members ?? [];

  useEffect(() => {
    document.title = `SplitBox — ${title}`;
  }, [title]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const amountNumber = Number(amount) || 0;
    const newExpense = {
      id: Date.now(),
      member: payer,
      expense: label || "Dépense",
      date: new Date().toLocaleDateString("fr-FR"),
      amount: amountNumber,
    };
    setExpenses((current) => [newExpense, ...current]);
    setLabel("");
    setAmount("");
    setPayer("Alice");
  };

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <div className="dashboard-title">{title}</div>
          <nav className="dashboard-nav">
            {['Ajouter', 'Historique', 'Bilan'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={tab === activeTab ? 'dashboard-tab active' : 'dashboard-tab'}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>

        {group?.members?.length ? (
          <div className="group-members-panel">
            <h3>Membres du groupe</h3>
            <div className="member-badges">
              {members.map((member) => (
                <span key={member} className="member-badge">
                  {member}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <section className="dashboard-form-panel">
          {activeTab === "Ajouter" && (
            <>
              <h2>Ajouter une Dépense</h2>
              <form className="expense-form" onSubmit={handleSubmit}>
                <label className="form-group">
                  <span>Libellé</span>
                  <input
                    type="text"
                    placeholder="ex: Hébergement Server"
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                  />
                </label>

                <label className="form-group">
                  <span>Montant</span>
                  <input
                    type="number"
                    placeholder="ex: 15000"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </label>

                <label className="form-group">
                  <span>Payé par</span>
                  {members.length > 0 ? (
                    <select value={payer} onChange={(event) => setPayer(event.target.value)}>
                      {members.map((member) => (
                        <option key={member} value={member}>
                          {member}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="empty-members">
                      Aucun membre ajouté pour ce groupe.
                    </div>
                  )}
                </label>

                <button type="submit" className="submit-expense" disabled={members.length === 0}>
                  Ajouter une Dépense
                </button>
              </form>
            </>
          )}

          {activeTab === "Historique" && (
            <>
              <h2>Historique des dépenses</h2>
              <div className="history-panel">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Membre</th>
                      <th>Dépense</th>
                      <th>Date</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="empty-history">
                          Aucune dépense enregistrée.
                        </td>
                      </tr>
                    ) : (
                      expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.member}</td>
                          <td>{expense.expense}</td>
                          <td>{expense.date}</td>
                          <td>{expense.amount.toFixed(2)} €</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "Bilan" && (
            <>
              <h2>Bilan</h2>
              <div className="bilan-summary">
                <div>
                  <span>Dépense totale :</span>
                  <strong>{expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)} €</strong>
                </div>
                <div>
                  <span>Part par membre :</span>
                  <strong>{(expenses.reduce((sum, exp) => sum + exp.amount, 0) / members.length).toFixed(2)} €</strong>
                </div>
              </div>
              <div className="history-panel">
                <table className="history-table bilan-table">
                  <thead>
                    <tr>
                      <th>Membre</th>
                      <th>Total payé</th>
                      <th>Part</th>
                      <th>Solde</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => {
                      const totalPaid = expenses
                        .filter((expense) => expense.member === member)
                        .reduce((sum, expense) => sum + expense.amount, 0);
                      const share = expenses.length === 0 ? 0 : expenses.reduce((sum, exp) => sum + exp.amount, 0) / members.length;
                      const balance = totalPaid - share;
                      const isPositive = balance >= 0;

                      return (
                        <tr key={member}>
                          <td>{member}</td>
                          <td>{totalPaid.toFixed(2)} €</td>
                          <td>{share.toFixed(2)} €</td>
                          <td className={isPositive ? "balance-positive" : "balance-negative"}>
                            {balance.toFixed(2)} €
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
