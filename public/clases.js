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

class EncargadoAduanas extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado);
    //TODO Agregar puesto dentro de la Aduana
  }
  //TODO Hacer metodos del Encargado de la Aduana
}

class EncargadoSucursales extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado);
    //TODO sucursal asignada
  }

  //TODO Hacer metodos del Encargado de la sucursales
}

class Repartidor extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pfoto, pcedula, pfecha, pgenero, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado, prazonDesact, psucursal) {

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

  setLicencia(licencia) {
    this.licencia.push(pobjLicencia)
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

class Convenio{

  constructor(pcodigoConvenio,pnombreConvenio,pdescripcionConvenio,pinstitucionConvenio,pcostoConvenio){

    this.codigoConvenio = pcodigoConvenio;
    this.nombreConvenio = pnombreConvenio;
    this.descripcionConvenio = pdescripcionConvenio;
    this.institucionConvenio = pinstitucionConvenio;
    this.costoConvenio = pcostoConvenio;
    
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