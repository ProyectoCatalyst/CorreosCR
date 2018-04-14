// (() => {
//     'use strict';
//     angular
//         .module('correosCR')
//         .controller('controladorEditarUsuario', controladorEditarUsuario)

//         controladorEditarUsuario.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

//     function controladorEditarUsuario($stateParams, $state, $http, servicioUsuarios) {
//         let vm = this;

//         let objUsuarioSinFormato = JSON.parse($stateParams.objEntierro);

//         let objUsuarioFormato = new Usuario (objUsuarioSinFormato.primerNombre, objUsuarioSinFormato.segundoNombre, objUsuarioSinFormato.primerApellido, objUsuarioSinFormato.segundoApellido, objUsuarioSinFormato.foto,  objUsuarioSinFormato.cedula, objUsuarioSinFormato.fecha, objUsuarioSinFormato.genero, objUsuarioSinFormato.ubicacion, objUsuarioSinFormato.provincia, objUsuarioSinFormato.canton, objUsuarioSinFormato.distrito, objUsuarioSinFormato.direccion, objUsuarioSinFormato.correo, objUsuarioSinFormato.foto, objUsuarioSinFormato.contrasenna, objUsuarioSinFormato.rol, objUsuarioSinFormato.estado);

//         let datos = [objUsuarioFormato.getCorreo()];

//         vm.usuarioEditado = {}
//         vm.usuarioEditado.primerNombre = objUsuarioFormato.primerNombre;
//         vm.usuarioEditado.segundoNombre = objUsuarioFormato.segundoNombre;
//         vm.usuarioEditado.primerApellido = objUsuarioFormato.primerApellido;
//         vm.usuarioEditado.segundoApellido = objUsuarioFormato.segundoApellido;
//         vm.usuarioEditado.cedula = objUsuarioFormato.cedula;
//         vm.usuarioEditado.fecha = objUsuarioFormato.fecha;
//         vm.usuarioEditado.genero = objUsuarioFormato.genero;
//         vm.usuarioEditado.ubicacion = objUsuarioFormato.ubicacion;
//         vm.usuarioEditado.provincia = objUsuarioFormato.provincia;
//         vm.usuarioEditado.canton = objUsuarioFormato.canton;
//         vm.usuarioEditado.distrito = objUsuarioFormato.distrito;
//         vm.usuarioEditado.direccion = objUsuarioFormato.direccion;
//         vm.usuarioEditado.correo = objUsuarioFormato.correo;
//         vm.usuarioEditado.foto = objUsuarioFormato.foto;
//         vm.usuarioEditado.contrasenna = objUsuarioFormato.contrasenna;
//         vm.usuarioEditado.rol = objUsuarioFormato.rol;
//         vm.usuarioEditado.estado = objUsuarioFormato.estado;

//         vm.editarUsuario = (pusuario) => {

//             let clienteEditado = new usuario (pentierro.entierroID, pentierro.horaInicio, pentierro.horaFinal, pentierro.fecha, pentierro.lugar, pentierro.prioridad);

//             objEntierroEditado.setCedulaCliente(datos[0]);
//             objEntierroEditado.setIdDifunto(datos[1]);

//             let actualizarCorrecto = servicioUsuarios.actualizarEntierro(objEntierroEditado);

//             if (actualizarCorrecto == true) {
//                 swal({
//                     title: "Actualización exitosa",
//                     text: "Entierro actualizado correctamente",
//                     icon: "success",
//                     button: "Aceptar"
//                 });

//                 $state.go('listarDifuntos');
//             }
//         }

//         vm.regresar = () => {
//             $state.go('listarDifuntos');
//         }
//     }
// })();