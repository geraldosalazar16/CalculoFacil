//Importando componentes
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {
  //Variables de uso general
  respuesta: any;
  explic: any;
  textos: string[];
  mostrar_procedimiento: boolean = true;
  componentes_resultado: Componete_Resultado[] = [];

  //Punto de entrada de la aplicación
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.respuesta = navParams.get('respuesta');

    /* Inicio procesamiento explic */
    this.explic = this.respuesta.result.explic.proc;
    this.explic = JSON.stringify(this.explic);
    this.explic = this.escapeHtml(this.explic );
    const separadores = ['&gt;','&lt;'];
    this.textos = this.explic.split (new RegExp (separadores.join('|'),'g'));
    var filtro1 : string[] = [];
    var texto_a_buscar = ['div','br','span'];
    var texto_a_comparar = ['b','','/b','"'];

    this.textos.forEach(texto => {
      var invalido: boolean = false;
      texto_a_buscar.forEach(buscar => {
        if(texto.indexOf(buscar) > -1) {
          invalido = true;
        }
      });
      texto_a_comparar.forEach(comparar => {
        if(texto === comparar) {
          invalido = true;
        }
      });
      if(!invalido) {
        texto = this.cambios(texto);
        filtro1.push(texto);
      }
    });
    this.textos = filtro1;
    /* Fin procesamiento explic */
    /* Procesar resultado */
    /*
    Estructura del desglose
      desglose= {
        grupos: [
          {
            nombre: '',
            datos: [
              {
                tipo: '',
                valores: ['','']
              }
            ]
          }
        ]
      }
    */
    var grupos = this.respuesta.desglose.grupos;
    grupos.forEach(grupo => {
      var datos = grupo.datos;
      datos.forEach(dato => {
        this.crear_elemento(<Dato>dato);
      });
    });
  }
  /*
  @quiero Función que elimina el caracter \ de un string   
  @para ---- Procesar explic ya que viene mezclado el mensaje con código html
  @author ---- Geraldo
  @param ---- 
  */
  escapeHtml(text) {
    var map = {
      '\\':' '
    };
    if(text){
      return text.replace(/\\/g, function(m) { return map[m]; });
    }
    return null;
  }
  /*
  @quiero Función que agrega tildes y ñ   
  @para ---- Procesar explic ya que viene mezclado el mensaje con código html
  @author ---- Geraldo
  @param ---- 
  */
  cambios(text){
    var map = {
      '&aacute;':'á',
      '&eacute;':'é',
      '&iacute;':'í',
      '&oacute;':'ó',
      '&uacute;':'ú',
      '&ntilde;':'ñ',
    };
    if(text){
      return text.replace(/&aacute;|&eacute;|&iacute;|&oacute;|&uacute;|&ntilde;/g, function(m) { return map[m]; });
    }
    return null;
  }
  ionViewDidLoad() {
  }
  crear_elemento(dato: Dato){
    var nuevo_cmp = new Componete_Resultado;
    nuevo_cmp.valor = [];
    switch (dato.tipo) {
      case 'encabezado':
        nuevo_cmp = new Componete_Resultado;
        nuevo_cmp.valor = [];
        nuevo_cmp.tipo = 'encabezado';
        nuevo_cmp.valor[0] = dato.valores[0];
        this.componentes_resultado.push(nuevo_cmp);
        break;
      case 'normal':
        nuevo_cmp = new Componete_Resultado;
        nuevo_cmp.valor = [];
        nuevo_cmp.tipo = 'normal';
        nuevo_cmp.valor.push(dato.valores[0]);
        nuevo_cmp.valor.push(dato.valores[1]);
        this.componentes_resultado.push(nuevo_cmp);
        break;
      case 'uno_centrado':
        nuevo_cmp = new Componete_Resultado;
        nuevo_cmp.valor = [];
        nuevo_cmp.tipo = 'uno_centrado';
        nuevo_cmp.valor[0] = dato.valores[0];
        this.componentes_resultado.push(nuevo_cmp);
        break;
      case 'uno':
        nuevo_cmp = new Componete_Resultado;
        nuevo_cmp.valor = [];
        nuevo_cmp.tipo = 'uno';
        nuevo_cmp.valor[0] = dato.valores[0];
        this.componentes_resultado.push(nuevo_cmp);
        break;
      case 'negritas':
        nuevo_cmp = new Componete_Resultado;
        nuevo_cmp.valor = [];
        nuevo_cmp.tipo = 'negritas';
        nuevo_cmp.valor[0] = dato.valores[0];
        nuevo_cmp.valor[1] = ' '+dato.valores[1];
        this.componentes_resultado.push(nuevo_cmp);
        break;
      default:
        
        break;
    }
  }
}
export interface Dato{
  tipo: string;
  valores: string[];
}

export class Componete_Resultado{
  tipo: string;
  valor: string[];
}
