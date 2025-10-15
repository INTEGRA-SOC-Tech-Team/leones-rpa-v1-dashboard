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

  // Función helper para formatear fecha y poder buscarla
  const formatDateForSearch = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Función helper para obtener el estatus como texto
  const getStatusText = (validation) => {
    if (!validation) return "sin validar";
    return validation.success ? "exitoso" : "con errores";
  };

  // Lógica de filtrado mejorada
  const filtered = records.filter((r) => {
    if (!filter) return true;

    const searchTerm = filter.toLowerCase().trim();

    // Búsqueda por nombre completo
    const nombres = r.payload?.datos_personales?.nombres?.toLowerCase() || "";
    const apellidoPaterno =
      r.payload?.datos_personales?.apellido_paterno?.toLowerCase() || "";
    const apellidoMaterno =
      r.payload?.datos_personales?.apellido_materno?.toLowerCase() || "";
    const nombreCompleto =
      `${nombres} ${apellidoPaterno} ${apellidoMaterno}`.trim();

    // Búsqueda por email
    const email = r.payload?.registro_inicial?.email?.toLowerCase() || "";

    // Búsqueda por teléfono
    const telefono = r.payload?.registro_inicial?.celular || "";

    // Búsqueda por estado
    const estado =
      r.payload?.informacion_inmueble?.estado
        ?.toLowerCase()
        .replace(/_/g, " ") || "";

    // Búsqueda por fecha
    const fecha = formatDateForSearch(r.date).toLowerCase();

    // Búsqueda por estatus
    const estatus = getStatusText(r.validation).toLowerCase();

    // Búsqueda por producto
    const producto =
      r.payload?.datos_credito_solicitado?.producto
        ?.toLowerCase()
        .replace(/_/g, " ") || "";

    // Búsqueda por referencia
    const referencia = (r.reference || "hsbc").toLowerCase();

    // Retorna true si encuentra coincidencia en cualquier campo
    return (
      nombreCompleto.includes(searchTerm) ||
      nombres.includes(searchTerm) ||
      apellidoPaterno.includes(searchTerm) ||
      apellidoMaterno.includes(searchTerm) ||
      email.includes(searchTerm) ||
      telefono.includes(searchTerm) ||
      estado.includes(searchTerm) ||
      fecha.includes(searchTerm) ||
      estatus.includes(searchTerm) ||
      producto.includes(searchTerm) ||
      referencia.includes(searchTerm)
    );
  });

  return (
  <div className="dashboard-container d-flex flex-column min-vh-100 full-width">
    <Navbar onLogout={() => window.location.reload()} />
    <div className="container-fluid my-4 full-width p-3">
      <h2 className="fw-bold mb-3 text-primary ps-4">Solicitudes de Crédito Leones Hipotecarios | RPA</h2>
      <div className="mb-3 w-50 p-4 pt-2 pb-2">
        <input
          type="text"
          placeholder="Buscar registro (ID, Nombre, Correo, Producto...)"
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
