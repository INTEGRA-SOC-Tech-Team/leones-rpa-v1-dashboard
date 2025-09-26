import { useEffect, useState } from "react";
import RecordsTable from "./RecordsTable";
import Navbar from "./Navbar";

function Dashboard({ user }) {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `/api/v1/internal/soc/quotes?user=cAiYboYV0UB3U8AF6tfVqPYF5Vmj7S5j`;
  const API_KEY = "sGzdYtrKMduBkJuUvjFItacoojIsEJEcGKUsrvWWdXuORLjunPqzlvtXtJqxTSaE"; // <-- aquí tu token

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });
        const data = await res.json();
        setRecords(data.list || []);
      } catch (error) {
        console.error("Error al obtener datos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = records.filter((r) =>
    filter
      ? r.payload?.datos_personales?.nombres
          ?.toLowerCase()
          .includes(filter.toLowerCase())
      : true
  );

  return (
  <div className="dashboard-container d-flex flex-column min-vh-100 full-width">
    <Navbar onLogout={() => window.location.reload()} />
    <div className="container-fluid my-4 full-width p-3">
      <h2 className="fw-bold mb-3 text-primary p-3">Dashboard de Cotizaciones</h2>
      <div className="mb-3 w-50 p-3">
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control"
        />
      </div>
      {loading ? (
        <div className="text-muted">Cargando...</div>
      ) : (
        <RecordsTable records={filtered} />
      )}
    </div>
  </div>
    );
}

export default Dashboard;
