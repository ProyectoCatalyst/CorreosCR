(() => {
    'use strcit'
    angular
        .module('correosCR')
        .controller('controladorRegistrarRepartidor', controladorRegistrarRepartidor);

    controladorRegistrarRepartidor.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'imageUploadService', 'Upload'];

    function controladorRegistrarRepartidor($http, $stateParams, $state, servicioUsuarios, imageUploadService, Upload) {
        let vm = this;

       // Funcion que optiene las provincias
        vm.provincias = $http({
            method: 'GET',
            url: './sources/data/provincias.json'
        }).then((success) => {
            vm.provincias = success.data;
        }, (error) => {
        });

       // Funcion que rellena los los cantones
        vm.rellenarCantones = (pidProvincia) => {
            vm.cantones = $http({
                method: 'GET',
                url: './sources/data/cantones.json'
            }).then((success) => {
                let cantones = [];
                for (let i = 0; i < success.data.length; i++) {
                    if (pidProvincia == success.data[i].idProvincia) {
                        cantones.push(success.data[i]);
                    }
                }
                vm.cantones = cantones;
            }, (error) => {
            });
        }

        vm.rellenarDistrito = (pidCanton) => {
            vm.distritos = $http({
                method: 'GET',
                url: './sources/data/distritos.json'
            }).then((success) => {
                let distritos = [];
                for (let i = 0; i < success.data.length; i++) {
                    if (pidCanton == success.data[i].idCanton) {
                        distritos.push(success.data[i]);
                    }
                }
                vm.distritos = distritos;
            }, (error) => {
            });
        }


        vm.repartidorNuevo = {};

        vm.cloudObj = imageUploadService.getConfiguration();

        vm.preRegistrarRepartidor = (prepartidorNuevo) => {
            vm.cloudObj.data.file = prepartidorNuevo.photo[0];
            Upload.upload(vm.cloudObj).success((data) => {
                vm.registrarRepartidor(prepartidorNuevo, data.url);
            });
            console.log(prepartidorNuevo)

        }


        vm.registrarRepartidor = (prepartidorNuevo, urlImagen) => {

            let rol = 4;
            let estado = true;

            let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-+<>ABCDEFGHIJKLMNOP1234567890";
            let contrasenna = "";
            for (let i = 0; i < 10; i++) {
                let x = Math.floor(Math.random() * chars.length);
                contrasenna += chars.charAt(x);
            }

            let nuevoRepartidor = new Repartidor(prepartidorNuevo.nombre, prepartidorNuevo.segundoNombre, prepartidorNuevo.primerApellido, prepartidorNuevo.segundoApellido, urlImagen, prepartidorNuevo.cedula, prepartidorNuevo.fechaNacimiento, prepartidorNuevo.genero,  prepartidorNuevo.correo, contrasenna, rol, estado, prepartidorNuevo.telefono, prepartidorNuevo.telefonoAdicional, prepartidorNuevo.sucursal);


            console.log(nuevoRepartidor);

             let registro = servicioUsuarios.agregarUsuario(nuevoRepartidor);

            if (registro == true) {
                swal({
                    title: "Registro exitoso",
                    text: "Cliente registrado correctamente, se ha enviado un correo electrónico con una contraseña provisional",
                    icon: "success",
                    button: "Aceptar"
                });
                // vm.clienteNuevo = null;
                // $state.go('paginaInicio');
            } else {
                swal({
                    title: "Ha ocurrido un Error",
                    text: "El usuario ha sido anteriormnete registrado.",
                    icon: "error",
                    button: "Aceptar"
                });
            }
        }

    }
})();

//         // vm.retornarDatosSucursales = servicioSucursales.retornarNombreSucursalesLS(); // requiere el servicio de sucursales para obtener la informacion de las sucursales en el sistema
//         vm.registrarRepartidor = (pnuevoRegistro) => {

//             if(!(pnuevoRegistro.contrasenna == pnuevoRegistro.confirmarContrasenna)){
//                 swal({
//                     title: "Las contrasenas...",
//                     text: "No coinciden en la confirmacion",
//                     icon: "error",
//                     button: "Aceptar"
//                 });
//             }else{

//                 pnuevoRegistro.estado = true;
//                 pnuevoRegistro.razonDesact = '';
//                 pnuevoRegistro.rol = 4;

//                 let objNuevoRegistro = new Repartidor(pnuevoRegistro.nombre, pnuevoRegistro.segundoNombre, pnuevoRegistro.primerApellido, pnuevoRegistro.segundoApellido, pnuevoRegistro.cedula, pnuevoRegistro.fechaNacimiento, pnuevoRegistro.genero, pnuevoRegistro.ubicacion, pnuevoRegistro.provincia, pnuevoRegistro.canton, pnuevoRegistro.distrito, pnuevoRegistro.direccion,pnuevoRegistro.correo, pnuevoRegistro.contrasenna, pnuevoRegistro.rol, pnuevoRegistro.telefono, pnuevoRegistro.telefonoAdicional, pnuevoRegistro.estado, pnuevoRegistro.razonDesact, pnuevoRegistro.sucursal),
//                 aDatos = [objNuevoRegistro, objNuevoRegistro.sucursal],
//                 aDatosVerificar = [objNuevoRegistro.correo, objNuevoRegistro.sucursal];

//                 let exito = verificarUsuario(aDatosVerificar[0]),
//                     edadCorrecta = verifiarEdad(objNuevoRegistro.fecha);

//                 if(exito){
//                     if(edadCorrecta){
//                         let datosRepartidor = [objNuevoRegistro.cedula, objNuevoRegistro.sucursal, objNuevoRegistro.nombre];
//                         servicioUsuarios.agregarRepartidor(aDatos);
//                         $state.go('main.listarTodosLosRepartidores');
//                         swal({
//                             title: "Éxito",
//                             text: "Hemos registrado el repartidor",
//                             icon: "success",
//                             button: "Aceptar"
//                         });
//                     }else{
//                         swal({
//                             title: "Verifique su edad",
//                             text: "No puede ser menor de edad",
//                             icon: "error",
//                             button: "Aceptar"
//                         });    
//                     }
//                 }else{
//                     swal({
//                         title: "Ya existe",
//                         text: "El repartidor ya existe en el sistema",
//                         icon: "error",
//                         button: "Aceptar"
//                     });
//                 }
//             }
//         }

//         vm.listarRepartidores = () => {
//             $state.go('main.listarTodosLosRepartidores');
//         }
//         //_______funciones internas________
//         function verificarUsuario(pcorreo){

//             let correosSistema = servicioUsuarios.retornarCorreosUsuarios(),
//             existente = false;

//             for(let i=0; i<correosSistema.length; i++){

//                 if(correosSistema[i] == pcorreo){
//                     existente = true;
//                 }
//             }
//             return !existente
//         }

//         function verifiarEdad(pfechaNacimiento){
//             let hoy = new Date,
//                 nacimiento = new Date(pfechaNacimiento),
//                 edad = (hoy-nacimiento) / 31536000000, // numero de un anio en milisegundos
//                 menor = false;

//                 if(edad < 18){
//                     menor = true
//                 }

//                 return !menor
//         }
//     }
// })();