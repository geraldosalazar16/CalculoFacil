export class Componente{
    tipo: string;
    label: string;
    descripcion: string;
    id: string;
    valores: any[]; //[{ "1" : "solo terreno" },...]
    default: any; //El valor del componente
    requerido: boolean;
    habilitado: boolean;
    placeholder: string;
    bloqueado: string;
    valor: any;
    id_seleccion: any;
    mascara: string;

    componentes: Componente[];
    
    constructor(){
        
    }
}