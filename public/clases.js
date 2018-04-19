class Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado) {
    this.primerNombre = pnombre;
    this.segundoNombre = psegundoNombre;
    this.primerApellido = pprimerApellido;
    this.segundoApellido = psegundoApellido;
    this.cedula = pcedula;
    this.fecha = pfecha;
    this.genero = pgenero;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    this.direccion = pdireccion;
    this.correo = pcorreo;
    this.foto = pfoto;
    this.contrasenna = pcontrasenna;
    this.rol = prol;
    this.estado = pestado;
  }

  getCedula() {
    return this.cedula;
  }

  getCorreo() {
    return this.correo;
  }

  getRol() {
    return this.rol;
  }

  getEstado() {
    return this.estado;
  }

  setEstado(pestado) {
    this.estado = pestado;
  }

  getContrasenna() {
    return this.contrasenna;
  }

}

class Encargado extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado, ptelefono, ptelefonoAdicional, psucursal, prolAduana) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado, ptelefono, ptelefonoAdicional, psucursal, prolAduana);

    this.telefono = ptelefono;
    this.telefonoAdicional = ptelefonoAdicional;
    this.sucursal = psucursal;
    this.rolAduana = prolAduana;
  }
}

class Repartidor extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado, ptelefono, ptelefonoAdicional, prazonDesact, psucursal) {

    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado);

    this.paqueteAsignado = [];
    this.licencia = [];
    this.telefono = ptelefono;
    this.telefonoAdicional = ptelefonoAdicional;
    this.razonDesact = prazonDesact;
    this.sucursal = psucursal;
  }

  getLicencias() {
    return this.licencia
  }

  getCorreo() {
    return this.correo
  }

  getEstado() {
    return this.estado
  }

  getPaqAsignados() {
    return this.paqueteAsignado;
  }

}

class Cliente extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado, ptelefono, plat, plong) {

    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado);

    this.telefono = ptelefono;
    this.tarjeta = [];
    this.paquetes = [];
    this.latitud = plat;
    this.longitud = plong;
  }

  agregarTarjetas(pnuevaTarjeta) {
    this.tarjeta.push(pnuevaTarjeta);
  }

  obtenerTargetas(){
    return this.tarjeta;
  }

  obtenerLatitud(){
    return this.latitud;
  }

  obtenerLongitud(){
    return this.longitud;
  }
}

class Tarjeta {
  constructor(ptipoTarjeta, pnombreTarjeta, pnumeroTarjeta, pcvvTarjeta, pmesTarjeta, pannoTarjeta, pidcliente) {
    this.tipoTarjeta = ptipoTarjeta;
    this.nombreTarjeta = pnombreTarjeta;
    this.numeroTarjeta = pnumeroTarjeta;
    this.cvvTarjeta = pcvvTarjeta;
    this.mesTarjeta = pmesTarjeta,
    this.annoTarjeta = pannoTarjeta,
    this.idCliente = pidcliente;
  }

  getNumeroTarjeta() {
    return this.numeroTarjeta;
  }

  getIdDuenno(){
    return this.idCliente;
  }
  //TODO Agregar los metodos de las tarjetas
}

class Paquete{
  constructor(ptrackingPaquete, ptipoPaquete, ppesoPaquete, pprecioPaquete, pcostoEnvio, 
    pcostoTotalPaquete, pestadoPaquete, pidrepartidor, pidsucursal, pidcliente, pidmensajero){
    this.trackingPaquete = ptrackingPaquete;
    this.tipoPaquete = ptipoPaquete;
    this.pesoPaquete = ppesoPaquete;
    this.precioPaquete = pprecioPaquete;
    this.costoEnvio = pcostoEnvio;
    this.costoTotalPaquete = pcostoTotalPaquete;
    this.estadoPaquete = pestadoPaquete;
    this.idRepartidor = pidrepartidor;
    this.idSucursal = pidsucursal;
    this.idCliente = pidcliente;
    this.idMensajero = pidmensajero;
  }
  //TODO Agregar  los metodos del paquete

  getTracking(){
    return this.trackingPaquete;
  }
  getEstadoPaquete(){
    return this.estadoPaquete;
  }
  
}

class Sucursal{
  constructor(pcodigoSucursal, pnombreSucursal, pprovincia, pcanton, pdistrito, pestadoSucursal, pubicacion){
    this.codigoSucursal = pcodigoSucursal;
    this.nombreSucursal = pnombreSucursal;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    this.estadoSucursal = pestadoSucursal;
    this.ubicacion = pubicacion;
    this.idEncargadoSucursal = '';
    this.repartidores = [];
  }

  getNombreSucursal(){
    return this.nombreSucursal;
  }

  getCodigoSucursal(){
    return this.codigoSucursal;
  }

  getEstadoSucursal(){
    return this.estadoSucursal;
  }

  getUbicacion(){
    return this.ubicacion;
  }

  getEncargado(){
    return this.idEncargadoSucursal;
  }

  setEncargado(pidnuevoencargado){
    this.idEncargadoSucursal = pidnuevoencargado;
  }

  setNuevoRepartidor(pnuevorepartidor){
    this.repartidores.push(pnuevorepartidor);
  }
}

class Convenio{
  constructor(pcodigoConvenio,pnombreConvenio,pdescripcionConvenio,pinstitucionConvenio,pcostoConvenio, pdesact){
    this.codigoConvenio = pcodigoConvenio;
    this.nombreConvenio = pnombreConvenio;
    this.descripcionConvenio = pdescripcionConvenio;
    this.institucionConvenio = pinstitucionConvenio;
    this.costoConvenio = pcostoConvenio;
    this.desact = pdesact;
    
  }
  
  getCodigo() {
    return this.codigoConvenio;
  }
  getNombre() {
    return this.nombreConvenio;
  }
  getCosto() {
    return this.costoConvenio;
  }
  
}

class Tramite{
  constructor(pcodigoTramite,pnombreTramite,pdescripcionTramite,pinstitucionTramite,pcostoTramite, pcedulaCliente, pcorreoCliente){

    this.codigoTramite = pcodigoTramite;
    this.nombreTramite = pnombreTramite;
    this.descripcionTramite = pdescripcionTramite;
    this.institucionTramite = pinstitucionTramite;
    this.costoTramite = pcostoTramite;
    this.cedulaCliente = pcedulaCliente;
    this.correoCliente = pcorreoCliente;
  }

  getCodigo(){
    return this.codigoTramite
  }
  getCedula(){
    return this.cedulaCliente
  }
}
class Licencia{
  constructor(pcodigo, pfechaVencimiento, ptipo, pestado, pidrepartidor){
    this.codigo = pcodigo;
    this.fechaVencimiento = pfechaVencimiento;
    this.tipo = ptipo;
    this.estado = pestado;
    this.idRepartidor = pidrepartidor;
  }

  getCodigo(){
    return this.codigo;
  }

  getEstado(){
    return this.estado;
  }
  
  getIdRepartidor(){
    return this.idRepartidor;
  }
}
