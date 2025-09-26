function RecordsTable({ records }) {
  return (
    <div className="table-responsive bg-white shadow rounded p-3">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Producto</th>
            <th>Estado</th>
            <th>Valor inmueble</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id.slice(0, 6)}...</td>
              <td>{r.payload?.datos_personales?.nombres + r.payload?.datos_personales?.apellido_paterno  || "N/A"}</td>
              <td>{r.payload?.registro_inicial?.email || "N/A"}</td>
              <td>{r.payload?.datos_credito_solicitado?.producto || "N/A"}</td>
              <td>{r.payload?.informacion_inmueble?.estado || "N/A"}</td>
              <td>
                {r.payload?.informacion_inmueble?.valor_inmueble?.toLocaleString() ||
                  "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsTable;
