import { Componente } from './componente.model';
import { Tabla } from './tabla.model';

export class Card{

    public titulo: string;
    public componentes: Componente[];
    public tablas: Tabla[];
    public mostrar_componentes: boolean;

    constructor()
    {
        this.componentes = [];
        this.tablas = [];
        this.mostrar_componentes = true;
    }
}