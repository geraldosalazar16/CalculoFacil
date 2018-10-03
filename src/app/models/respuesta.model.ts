export class Respuesta{

    public cards: CardRespuesta[];
    constructor()
    {
        this.cards = [];
    }
}
export class CardRespuesta{
    titulo: string;
    componentes: ComponenteRespuesta[];
    tablas: TablaRespuesta[]
    constructor(){
        this.componentes = [];
        this.tablas = [];
    }
}
export class ComponenteRespuesta{
    id: string;
    tipo: string;
    valor: any;
    componentes: ComponenteRespuesta[];
    constructor(){

    }
}
export class TablaRespuesta{
    id: string;
    columnas: ColumnaRespuesta[];
    filas: FilaRespuesta[];
    constructor(){
        this.columnas = [];
        this.filas = [];
    }
}
export class ColumnaRespuesta{
    id: string;
    constructor(){

    }
}
export class FilaRespuesta{
    celdas: CeldaRespuesta[];
    constructor(){
        this.celdas = [];
    }
}
export class CeldaRespuesta{
    id_columna: string;
    valor: any;
    constructor(){

    }
}
