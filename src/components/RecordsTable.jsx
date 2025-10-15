import { useState } from 'react';

function RecordsTable({ records }) {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (validation) => {
    if (!validation) return <span className="badge bg-secondary">Sin validar</span>;
    
    return validation.success ? (
      <span className="badge bg-success">Exitoso</span>
    ) : (
      <span className="badge bg-warning">Con errores</span>
    );
  };



  return (
    <>
      <div className="table-responsive bg-white shadow rounded p-3">
        <table className="table table-striped table-hover align-middle text-center">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>ID</th>
              <th style={{ width: '20%' }}>Fecha</th>
              <th style={{ width: '20%' }}>Referencia</th>
              <th style={{ width: '20%' }}>Detalle de Solicitud</th>
              <th style={{ width: '20%' }}>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>
                  <code className="small">{record.id.slice(0, 8)}...</code>
                </td>
                <td className="small">{formatDate(record.date)}</td>
                <td>
                  <span className="badge bg-danger text-dark text-white">
                    {record.reference || 'HSBC'}
                  </span>
                </td>
                                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleShowDetails(record)}
                  >
                    <i className="bi bi-eye"></i> Ver
                  </button>
                </td>
                <td>{getStatusBadge(record.validation)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Bootstrap */}
      {showModal && selectedRecord && (
        <>
          <div 
            className="modal fade show" 
            style={{ display: 'block' }} 
            tabIndex="-1"
            onClick={handleCloseModal}
          >
            <div 
              className="modal-dialog modal-lg modal-dialog-scrollable"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: '#046B4B', color: 'white' }}>
                  <h5 className="modal-title">
                    Detalle del Registro
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* ID y Fecha */}
                  <div className="mb-4">
                    <h6 className="text-muted">Información General</h6>
                    <p><strong>ID:</strong> <code>{selectedRecord.id}</code></p>
                    <p><strong>Fecha:</strong> {formatDate(selectedRecord.date)}</p>
                    <p><strong>Referencia:</strong> {selectedRecord.reference || 'HSBC'}</p>
                  </div>

                  <hr />

                  {/* Datos Personales */}
                  {selectedRecord.payload?.datos_personales && (
                    <div className="mb-4">
                      <h6 className="text-primary">Datos Personales</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="mb-1"><strong>Nombre completo:</strong></p>
                          <p className="text-muted">
                            {selectedRecord.payload.datos_personales.nombres} {' '}
                            {selectedRecord.payload.datos_personales.apellido_paterno} {' '}
                            {selectedRecord.payload.datos_personales.apellido_materno}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1"><strong>RFC:</strong></p>
                          <p className="text-muted">{selectedRecord.payload.datos_personales.rfc || 'N/A'}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1"><strong>Fecha de nacimiento:</strong></p>
                          <p className="text-muted">{selectedRecord.payload.datos_personales.fecha_nacimiento || 'N/A'}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1"><strong>Estado civil:</strong></p>
                          <p className="text-muted">{selectedRecord.payload.datos_personales.estado_civil || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Registro Inicial */}
                  {selectedRecord.payload?.registro_inicial && (
                    <div className="mb-4">
                      <h6 className="text-primary">Registro Inicial</h6>
                      <p><strong>Email:</strong> {selectedRecord.payload.registro_inicial.email || 'N/A'}</p>
                      <p><strong>Celular:</strong> {selectedRecord.payload.registro_inicial.celular || 'N/A'}</p>
                    </div>
                  )}

                  {/* Crédito Solicitado */}
                  {selectedRecord.payload?.datos_credito_solicitado && (
                    <div className="mb-4">
                      <h6 className="text-primary">Crédito Solicitado</h6>
                      <p><strong>Producto:</strong> {selectedRecord.payload.datos_credito_solicitado.producto || 'N/A'}</p>
                    </div>
                  )}

                  {/* Información del Inmueble */}
                  {selectedRecord.payload?.informacion_inmueble && (
                    <div className="mb-4">
                      <h6 className="text-primary">Información del Inmueble</h6>
                      <p><strong>Estado:</strong> {selectedRecord.payload.informacion_inmueble.estado || 'N/A'}</p>
                      <p><strong>Valor del inmueble:</strong> ${selectedRecord.payload.informacion_inmueble.valor_inmueble?.toLocaleString('es-MX') || 'N/A'}</p>
                      <p><strong>Importe solicitado:</strong> ${selectedRecord.payload.informacion_inmueble.importe_solicitado?.toLocaleString('es-MX') || 'N/A'}</p>
                    </div>
                  )}

                  {/* Empleos e Ingresos */}
                  {selectedRecord.payload?.empleos_e_ingresos && (
                    <div className="mb-4">
                      <h6 className="text-primary">Empleos e Ingresos</h6>
                      <p><strong>Antigüedad laboral:</strong> {selectedRecord.payload.empleos_e_ingresos.antiguedad_laboral || 'N/A'} años</p>
                      {selectedRecord.payload.empleos_e_ingresos.actividad && (
                        <>
                          <p><strong>Tipo:</strong> {selectedRecord.payload.empleos_e_ingresos.actividad.tipo || 'N/A'}</p>
                          <p><strong>Ingreso neto:</strong> ${selectedRecord.payload.empleos_e_ingresos.actividad.ingreso_neto?.toLocaleString('es-MX') || 'N/A'}</p>
                          <p><strong>Ingreso bruto:</strong> ${selectedRecord.payload.empleos_e_ingresos.actividad.ingreso_bruto?.toLocaleString('es-MX') || 'N/A'}</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Análisis de Crédito */}
                  {selectedRecord.payload?.analisis_credito && (
                    <div className="mb-4">
                      <h6 className="text-primary">Análisis de Crédito</h6>
                      <p><strong>Código postal:</strong> {selectedRecord.payload.analisis_credito.codigo_postal || 'N/A'}</p>
                      <p><strong>Dirección:</strong> {selectedRecord.payload.analisis_credito.calle || 'N/A'} {selectedRecord.payload.analisis_credito.numero_exterior || ''}</p>
                      <p><strong>Antigüedad:</strong> {selectedRecord.payload.analisis_credito.antiguedad || 'N/A'} años</p>
                    </div>
                  )}

                  <hr />

                  {/* Validación e Issues */}
                  {selectedRecord.validation && (
                    <div className="mb-3">
                      <h6 className="text-danger">Validación</h6>
                      <p><strong>Estado:</strong> {getStatusBadge(selectedRecord.validation)}</p>
                      
                      {selectedRecord.validation.issues && selectedRecord.validation.issues.length > 0 && (
                        <div className="mt-3">
                          <h6 className="text-warning">Issues detectados:</h6>
                          <div className="list-group">
                            {selectedRecord.validation.issues.map((issue, index) => (
                              <div key={index} className="list-group-item">
                                <div className="d-flex w-100 justify-content-between">
                                  <h6 className="mb-1 text-danger">{issue.path}</h6>
                                  <small className="badge bg-secondary">{issue.type}</small>
                                </div>
                                <p className="mb-1">{issue.message}</p>
                                <small className="text-muted">Esperado: {issue.expected}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default RecordsTable; 
 const getIssuesCount = (validation) => {
    if (!validation || !validation.issues) return 0;
    return validation.issues.length;
  };