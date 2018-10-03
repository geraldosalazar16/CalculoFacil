import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {
  respuesta: any;
  explic: any;
  textos: string[];
  mostrar_procedimiento: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.respuesta = navParams.get('respuesta');
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
  }
  escapeHtml(text) {
    var map = {
      '\\':' '
    };
    if(text){
      return text.replace(/\\/g, function(m) { return map[m]; });
    }
    return null;
  }
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

}
