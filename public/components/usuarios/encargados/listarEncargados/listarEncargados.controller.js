(() => {
    'use strict'

    angular
    .module('correosCR')
    .controller('controladorListarEncargados', controladorListarEncargados)

    controladorListarEncargados.$inject = ['$state', '$stateParams', 'servicioUsuarios'];
    function controladorListarEncargados($state, $stateParams, servicioUsuarios){
        let vm = this;

        vm.listarEncargadosSucursalAct = listarEncargadosSucursalAct();

        vm.listarEncargadosAduanaAct = listarEncargadosAduanaAct();

        vm.listarEncargadosSucursalDesact = listarEncargadosSucursalDesact();

        vm.listarEncargadosAduanaDesact = listarEncargadosAduanaDesact();

        vm.editarEncargado = (pencargado) => {
            $state.go('main.editarEncargados', {datosMod: JSON.stringify(pencargado)});
        }

        vm.cambiarEstado = (pencargadoDesact) => {
            pencargadoDesact.estado =  !pencargadoDesact.estado;
            servicioUsuarios.actualizarUsuario(pencargadoDesact);
            $state.reload();
        }

        vm.agregarEncargado = () => {
            $state.go('main.registrarEncargado')
        }

        function listarEncargadosSucursalAct(){
            let encargadosSucursal = servicioUsuarios.obtenerlistadeFiltrada(3),
            encargadosSucursalAct = [];

            for(let i=0; i<encargadosSucursal.length; i++){
                if(encargadosSucursal[i].estado){
                    encargadosSucursalAct.push(encargadosSucursal[i]);
                }
            }
            return encargadosSucursalAct
        }

        function listarEncargadosAduanaAct(){
            let encargadosAduana = servicioUsuarios.obtenerlistadeFiltrada(2),
            encargadosAduanaAct = [];

            for(let i=0; i<encargadosAduana.length; i++){
                if(encargadosAduana[i].estado){
                    encargadosAduanaAct.push(encargadosAduana[i]);
                }
            }
            return encargadosAduanaAct
        }

        function listarEncargadosSucursalDesact(){
            let encargadosSucursal = servicioUsuarios.obtenerlistadeFiltrada(3),
            encargadosSucursalDesact = [];

            for(let i=0; i<encargadosSucursal.length; i++){
                if(!encargadosSucursal[i].estado){
                    encargadosSucursalDesact.push(encargadosSucursal[i]);
                }
            }
            return encargadosSucursalDesact
        }

        function listarEncargadosAduanaDesact() {
            let encargadosAduana = servicioUsuarios.obtenerlistadeFiltrada(2),
            encargadosAduanaDesact = [];

            for(let i=0; i<encargadosAduana.length; i++){
                if(!encargadosAduana[i].estado){
                    encargadosAduanaDesact.push(encargadosAduana[i]);
                }
            }
            return encargadosAduanaDesact
        }

    }
})();