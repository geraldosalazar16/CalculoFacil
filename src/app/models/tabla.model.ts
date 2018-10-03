import { Columna } from './columna.model';
import { Fila } from './fila.model';

export class Tabla{
    id: string;
    boton_agregar: string;
    filas: Fila[];
    columnas: Columna[];
}