/*
@quiero Crear página de inicio de la app 
@para ---- Contar con un punto de entrada
@author ---- Geraldo
@param ---- 
*/

/********* Importando módulos *********/
import { Component, ViewChildren, QueryList, AfterViewInit, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
/********* Importando componentes *********/
import { InputComponent } from '../../components/input/input';
import { SelectComponent } from '../../components/select/select';
import { BotonComponent } from '../../components/boton/boton';
import { MyToggleComponent } from '../../components/my-toggle/my-toggle';
/********* Importando providers *********/
import { RestServiceProvider, Estructura } from '../../providers/rest-service/rest-service';
import { PnotifyProvider } from '../../providers/pnotify/pnotify';
/********* Importando modelos propios *********/
import { Formulario } from '../../app/models/formulario.model';
import { Boton } from '../../app/models/boton.model';
import { Card } from '../../app/models/card.model';
import { Componente } from '../../app/models/componente.model';
import { Tabla } from '../../app/models/tabla.model';
import { Fila } from '../../app/models/fila.model';
import { Celda } from '../../app/models/celda.model';
import { Columna } from '../../app/models/columna.model';
import { CmpRespuesta } from '../../app/models/cmp_respuesta.model';
import { Respuesta, CardRespuesta, ComponenteRespuesta, TablaRespuesta, ColumnaRespuesta, FilaRespuesta, CeldaRespuesta } from '../../app/models/respuesta.model';
/********* Importando páginas *********/
import { ResultadosPage } from '../resultados/resultados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit, OnInit{
  /*
  @quiero Acceder al componente slides del dom 
  @para ---- Crear un slide para cada card recibida
  @author ---- Geraldo
  @param ---- 
  */
  @ViewChild(Slides) slides: Slides;
  /*
  @quiero Acceder a los controles insertados en el DOM 
  @para ---- Leer sus valores y procesarlos
  @author ---- Geraldo
  @param ---- 
  */
  @ViewChildren(InputComponent) inputs: QueryList<InputComponent>;
  @ViewChildren(SelectComponent) selects: QueryList<SelectComponent>;
  @ViewChildren(BotonComponent) botones: QueryList<BotonComponent>;
  @ViewChildren(MyToggleComponent) toggles: QueryList<MyToggleComponent>;
  /*
  @quiero Crear variables de uso general  
  @para ---- Manipular los elementos del DOM (leer y escribir sus valores)
  @author ---- Geraldo
  @param ---- 
  */
  form: Formulario = new Formulario();
  botones_recibidos: Array<Boton> = [];
  cards_recibidos: Array<Card> = []; 
  componentes_recibidos: Array<Componente> = []; 
  tablas_recibidas: Array<Tabla> = [];
  filas_recibidas: Array<any> = [];
  estructuras: Array<Estructura>
  est: any[]; 
  errores_encontrados = 0;

  cmp_respuestas: CmpRespuesta[] = [];

  pnotify: any;
  //Listado de tipos de cálculo
  calculos;
  //habilita / Deshabilita el listado de cálculos
  deshabilitar_select_calculos: boolean = false;
  //Almacena el cálculo actual
  calculo_actual;
  //Determina si estamos creando o editando un cálculo
  accion: string;
  orden = 0;
  /*
  @quiero Crear estructura inicial que se va a cargar
  @para ---- Evitar que la aplicación empiece en blanco
  @author ---- Geraldo
  @param ---- 
  */
  estructura_actual: Estructura = {
    estructura: 'ISR x Enajenación',
    tipo: 1,
    url: 'http://minotaria.net/base/angular/calculofacil/api_racoo/isr_enajenacion.php',
    inicial: true
  };
  inicial = true;
  /*
  @quiero Crear el constructor de la página  
  @para ---- Leer las posibles estructuras a usar
  @author ---- Geraldo
  @param ---- 
  */
  constructor(
    public navCtrl: NavController,
    private restProvider: RestServiceProvider,
    public navParams: NavParams,
    pnotify: PnotifyProvider,
    private cdr: ChangeDetectorRef
  ) {
    this.calculo_actual = navParams.get('data');
    
    this.inicial = false;
    this.estructuras = [];
    //Consume el rest provider para leer las posibles estructuras
    //const estructuras = await this.restProvider.getEstructuras()
    
    this.pnotify = pnotify.getPNotify();
    
    this.getEstructuras();
  }
  async getEstructuras(){
    this.orden = 0;
    const estructuras = await this.restProvider.getEstructuras();

    estructuras.forEach(data => {
      this.estructuras.push(data);
      //Cuando es creación de cálculo se carga la inicial por defecto
      if(this.calculo_actual == ''){
        this.accion = 'insertar';
        //La estructura que tenga el atributo inicial = true es la que se suará pro defecto
        if (data.inicial) {
          this.estructura_actual = data;
          this.calculos = data;
          this.deshabilitar_select_calculos = false;
        }
      } else {
        this.accion = 'editar';
        //De lo contrario es edición por lo que se carga el tipo de cálculo y se bloquea el select
        if(data.tipo == this.calculo_actual.tipo){
          //Selecciono la estructura segun el tipo de cálculo
          this.estructura_actual = data;
          this.calculos = data;
          this.deshabilitar_select_calculos = true;
        }
      }
    });
  }
  /*
  @quiero Función que se activa cuando se termina de cargar la vista  
  @para ---- Usar la estructura marcada como actual para leer sus componentes
  @author ---- Geraldo
  @param ---- 
  */
  ionViewDidLoad () {
    console.log('ionViewDidLoad Posicion: ',this.orden);
    console.log('Inputs length: ',this.inputs.length)
    this.orden++;

    this.restProvider.getEstructura(this.estructura_actual.url)
    .subscribe((data: any) =>{
      if(this.accion == 'insertar'){
        this.usar_estructura(data);
      } else {
        var data_modificado = this.cargarCalculoActual(data,this.calculo_actual.data);
        this.usar_estructura(data_modificado);
      }   
    });
  }
  ionViewWillEnter() {
    /*...*/
    console.log('ionViewWillEnter Posicion: ',this.orden);
    console.log('Inputs length: ',this.inputs.length)
    this.orden++;
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave Posicion: ',this.orden);
    console.log('Inputs length: ',this.inputs.length)
    this.orden++;
    /*...*/}
  //Fired when entering a page, after it becomes the active page.
  ionViewDidEnter(){
    console.log('ionViewDidEnter Posicion: ',this.orden);
    console.log('Inputs length: ',this.inputs.length)
    this.orden++;
    /*
    if(this.accion == 'editar'){
      this.cargarCalculoActual();
    }
    */
  }
  cargarCalculoActual(data_estructura,calculo_cargar){
    var r;
    //data es la estructura original
    data_estructura.cards.forEach(card => {
      if(card.componentes){
        card.componentes.forEach(componente => {    
          var res = calculo_cargar.some(componente_cargar => {
            if(componente_cargar.id == componente.id) {
              componente.default = componente_cargar.valor;
              return true;
            }
            return false;
          });
          r = res;
        });
      } 
      //Luego de los componentes del card hay que explorar las tablas     
      if(card.tablas && r){
        card.tablas.forEach(tabla => {
          //Mapeo de las filas de la tabla
          tabla.filas.forEach((fila,index) => {
            //Mapeo de las celdas de la tabla
            fila.celdas.forEach(celda => {
              var id = celda.id_columna+fila.index;
              
              calculo_cargar.some(componente_cargar => {
                var id_cargar = componente_cargar.id + componente_cargar.fila;
                if(id_cargar == id) {
                  celda.valor = componente_cargar.valor;
                  return true;
                }
                return false;
              });
            });
          });
        });
      } 
    });
    return data_estructura;
  }
  /*
  @quiero Escuchar cuando se cambia de structura 
  @para ---- Asignar la estructura seleccionada como la estructura actual
  @author ---- Geraldo
  @param ---- 
  */
  cambio_estructura() {
    //Solo se puede cambiar cuando es inserción
    if(this.accion == 'insertar'){
      this.estructura_actual = this.calculos;
      this.cargar_estructura();
      this.goToSlide(0);
    } else {
      //this.cargar_calculo();
      this.goToSlide(0);
    }
  }
  /*
  @quiero Cargar la estructura seleccionada como actual en el DOM  
  @para ---- Crear los componentes de la estructura
  @author ---- Geraldo
  @param ---- 
  */
  cargar_estructura() {
    //get the currently active page component
    var component = this.navCtrl.getActive().instance;
    //re-run the view load function if the page has one declared
    if (component.ionViewDidLoad) {
      component.ionViewDidLoad();
    }
  }
  cargar_calculo() {
    //get the currently active page component
    var component = this.navCtrl.getActive().instance;
    //re-run the view load function if the page has one declared
    if (component.ionViewDidEnter) {
      component.ionViewDidEnter();
    }
  }
  /*
  @quiero Usar la estructura actual  
  @para ---- Definir objetos en el DOM de forma dinámica
  @author ---- Geraldo
  @param ---- data sigue la estructura definida para enviar los componentes
  {
    "titulo" : "",
    "version" : "",
    "botones" :[
            
        ],
    "cards" : [
        {
            "titulo": "",
            "componentes" : [
                
            ],
                "tablas": []
        }
    ]
}
  */
  usar_estructura (data){
    this.form.titulo = data.titulo; 

      this.botones_recibidos =  [];
      //Creo los botones de la estructura
      data.botones.forEach(boton => {
        var btn = new Boton();
        btn.color = boton.color;
        btn.descripcion =boton.descripcion;
        btn.habilitado = boton.habilitado;
        btn.id = boton.id;
        btn.nombre = boton.nombre;
        btn.url = boton.url;
        btn.accion = boton.accion;
        this.botones_recibidos.push(btn);
      });
      //Creo los slides dependiendo de los cards recibidos
      this.cards_recibidos = [];
      data.cards.forEach(card => {
        this.componentes_recibidos = [];
        this.tablas_recibidas = [];
  
        var carta = new Card();
        carta.titulo = card.titulo;
        //mapeo de los componentes del card
        if(card.componentes){
          card.componentes.forEach(componente => {    
            this.componentes_recibidos.push(this.crear_componente(componente));
          });
          carta.componentes = this.componentes_recibidos;
        }  
        //Mapeo de las tablas del card
        this.tablas_recibidas = [];
        if(card.tablas){
          card.tablas.forEach(tabla => {
            var t = new Tabla();
            t.id = tabla.id;
            t.boton_agregar = tabla.boton_agregar;
            t.filas = [];
            //Mapeo de las filas de la tabla
            tabla.filas.forEach((fila,index) => {
              var f = new Fila();
              f.index = fila.index;
              f.fija = fila.fija;
              f.celdas = [];
              //Mapeo de las celdas de la tabla
              fila.celdas.forEach(celda => {
                var c = new Celda();
                c.id_columna = celda.id_columna;
                c.valor = celda.valor;
                c.bloqueada = celda.bloqueada;
                c.fila = f.index;
                f.celdas.push(c);
              });
              t.filas.push(f);
            });
            
            //Mapeo de las columnas de la tabla
            t.columnas = [];
            tabla.columnas.forEach(columna => {
              var c = new Columna();
              c.id = columna.id;
              c.nombre = columna.nombre;
              c.componente = this.crear_componente(columna.componente);
              t.columnas.push(c);
            });
            this.tablas_recibidas.push(t);
          });
          carta.tablas = this.tablas_recibidas;
        }  
        else{
          carta.tablas = [];
        }  
        this.cards_recibidos.push(carta);
      });
      if(this.accion == 'editar'){
        this.cards_recibidos.forEach(card => {
          card.tablas.forEach(tabla => {
            tabla.columnas.forEach(columna => {
              this.calculo_actual.data.forEach(cmp_calculo => {
                if(cmp_calculo.id == columna.id){
                  var fila_encontrada = false;
                  tabla.filas.forEach(fila => {
                    if(fila.index == cmp_calculo.fila){
                      fila_encontrada = true;
                      var celda_encontrada = false;
                      fila.celdas.forEach(celda => {
                        if(celda.id_columna == cmp_calculo.id){
                          celda.valor = cmp_calculo.valor;
                          celda_encontrada = true;
                        }
                      });
                      if(!celda_encontrada){
                        var c = new Celda();
                        c.id_columna = columna.id;
                        c.valor = cmp_calculo.valor;
                        c.bloqueada = false;
                        c.fila = cmp_calculo.fila;
                        fila.celdas.push(c);
                      }
                    }
                  });
                  if(!fila_encontrada){
                    var f = new Fila();
                    f.index = cmp_calculo.fila;
                    f.fija = false;
                    f.celdas = [];
                    var c = new Celda();
                    c.id_columna = columna.id;
                    c.valor = cmp_calculo.valor;
                    c.bloqueada = false;
                    c.fila = cmp_calculo.fila;
                    f.celdas.push(c);
                    tabla.filas.push(f);
                  }
                }
              });
            });
          });
        });
        console.log(this.cards_recibidos);
      }
      
  }
  /*
  @quiero Función para mapear el componente recibido a la interfaz de componente creada  
  @para ---- Tener uan estructura legible y manipulable del componente
  @author ---- Geraldo
  @param ---- Los elementos del componente recibido varían dependiendo
  del tipo de componente, como referencia usar el modelo Componente
  */
  crear_componente(componente){
    var cmp = new Componente();
    cmp.tipo = componente.tipo;
    cmp.label = componente.label;
    cmp.descripcion = componente.descripcion;
    cmp.id = componente.id;
    cmp.valores = componente.valores;
    cmp.default = componente.default;
    cmp.requerido = componente.requerido;
    cmp.habilitado = componente.habilitado;
    cmp.placeholder = componente.placeholder;
    cmp.bloqueado = componente.bloqueado;
    cmp.id_seleccion = componente.id_seleccion;
    cmp.mascara = componente.mascara;
    //Sie el componente tiene componentes hijos también hay que mapearlos
    cmp.componentes = [];
    if(componente.componentes){
      componente.componentes.forEach(element => {
        cmp.componentes.push(this.crear_componente(element));
      });
    }
    return cmp;
  }
  /*
  @quiero Función para mapear un elemento del DOM a un componente de respuesta  
  @para ---- Cumplir con la estructura de respuesta definida
  @author ---- Geraldo
  @param ---- 
  */
  crear_componente_enviar(componente: Componente){
    var cmp_enviar : ComponenteRespuesta = new ComponenteRespuesta();
    cmp_enviar.id = componente.id;
    cmp_enviar.valor = componente.valor;
    cmp_enviar.tipo = componente.tipo;
    cmp_enviar.componentes = [];
    
    if(componente.componentes){
      componente.componentes.forEach(element => {
        cmp_enviar.componentes.push(this.crear_componente_enviar(element));
      });
    }
    return cmp_enviar;
  }
  //Función que se ejecuta luego de inicializada la vista
  ngAfterViewInit() {
    this.cdr.detectChanges();
    console.log('ngAfterViewInit Posicion: ',this.orden);
    console.log('Inputs length: ',this.inputs.length)
    this.orden++;
  }
  //Función que se ejecuta cuando inicializa la app
  ngOnInit(){
    this.cdr.detectChanges();
    console.log('ngOnInit Posicion: ',this.orden);
    console.log('Inputs length: ',this.inputs.length)
    this.orden++;
  }
  ngAfterViewChecked(){
    
  }
  /*
  @quiero Función que escucha al botón Siguiente   
  @para ---- Moverse hacia adelante en el slide
  @author ---- Geraldo
  @param ---- 
  */
  next() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.slides.slideNext(10);
    currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
  /*
  @quiero Función que escucha al botón Anterior   
  @para ---- Moverse hacia atrás en el slide
  @author ---- Geraldo
  @param ---- 
  */
  prev() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.slides.slidePrev();
    currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
  /*
  @quiero Función para ir a un slide específico   
  @para ---- De momento no se usa
  @author ---- Geraldo
  @param ---- 
  */
  goToSlide(slide) {
    this.slides.slideTo(slide, 500);
  }
  /*
  @quiero Función enlazada a botón Eliminar Fila   
  @para ---- Eliminar una fila x
  @author ---- Geraldo
  @param ---- 
  */
  eliminar_fila(tabla: Tabla,fila){
    tabla.filas.splice(fila,1);
  }
  /*
  @quiero Función que escucha al evento Toggle   
  @para ---- Mostrar u ocultar los elementos de un componente tipo toggle-componentes
  @author ---- Geraldo
  @param ---- 
  */
  onToggle(componente: Componente,res: boolean){
    componente.componentes.forEach(cmp => {
      cmp.habilitado = res;
    });
  }
  /*
  @quiero Función que escucha a un select   
  @para ---- Mostrar u ocultar los elementos de un componente select-componentes dependiendo del valor seleccionado
  @author ---- Geraldo
  @param ---- 
  */
  onChangeSelect(componente: Componente,valor){
    componente.componentes.forEach(cmp => {
      if(cmp.id_seleccion == valor){
        cmp.habilitado = true;
      }
      else{
        cmp.habilitado = false;
      }
    });
  }
  /*
  @quiero Función que escucha al botón Calcular o Guardar   
  @para ---- Realizar la acción asociada al botón
  @author ---- Geraldo
  @param ---- 
  */
  click_boton(boton: BotonComponent){
    if(boton.accion == "enviar_datos"){
      //Leer todos los valores de los elementos del DOM
      this.leer_forma();
      //Ordenar los componentes
      var componentes_ordenados: Array<CmpRespuesta> = [];
      this.cards_recibidos.forEach(card => {
        //Primero recorro todos los cards recibidos
        card.componentes.forEach(cmp_card => {
          
          this.cmp_respuestas.some(cmp_respuesta => {
            if(cmp_respuesta.id == cmp_card.id){
              componentes_ordenados.push(cmp_respuesta);
              return true;
            }
            return false;
          });

        });
        //Luego las tablas
        if(card.tablas){
          card.tablas.forEach(tabla_card => {
            tabla_card.filas.forEach(fila => {
              fila.celdas.forEach(celda => {
                this.cmp_respuestas.some(cmp_respuesta => {
                  const id_cmp_respuesta = cmp_respuesta.id + cmp_respuesta.fila;
                  const id_celda = celda.id_columna + celda.fila;
                  if(id_cmp_respuesta == id_celda){
                    componentes_ordenados.push(cmp_respuesta);
                    return true;
                  }
                  return false;
                });
              });
            });
          });
        }        
      });
      //Enviar a la URL asociada al botón los valores leídos
     this.restProvider.getUrl(boton.url,componentes_ordenados)
     .subscribe((data: any) =>{      
        //Buscar errores
        var errores = data.data;
        var mensajes = data.messages;
        //Si hay mensajes se muestran como una notificación
        mensajes.forEach(mensaje => {
          this.mostrar_mensaje(mensaje.tipo,mensaje.message);
        });
        /*
        @quiero Recorrer el arreglo de errores recibidos   
        @para ---- Asignar el valor y el error recibidos a su elemento del DOM correspondiente
        @author ---- Geraldo
        @param ---- 
        */
        if(errores.length > 0){
          this.errores_encontrados = 0;
          for(var i = 0; i < errores.length; i++){
            var error = errores[i];
            var cmp_respuesta = new CmpRespuesta();
            cmp_respuesta.id = error.id;
            cmp_respuesta.fila = error.fila;
            cmp_respuesta.error = error.error;
            cmp_respuesta.valor = error.valor;
            this.buscar_componente_error(cmp_respuesta);
          }
          if(this.errores_encontrados === 0){ //Si no se encontraron errores navego hacia la página de resultados
            this.navCtrl.push(ResultadosPage,{respuesta:data});
          }
        } else { //Si no se enviaron errores navego hacia la página de resultados
          this.navCtrl.push(ResultadosPage,{respuesta:data});
        }
    });
  
    }
  }
  /*
  @quiero Función que escucha al botón Agregar   
  @para ---- Agregar una fila a una tabla
  @author ---- Geraldo
  @param ---- tabla
  {
    "id": "", 
    "boton_agregar": "",
    "columnas": [] 
  }
  */
  agregar_fila(tabla){
      const columnas = tabla.columnas;
      const indice = tabla.filas.length;
      const fila = new Fila();
      fila.celdas = [];
      fila.index = indice;
      fila.fija = false;
      tabla.columnas.forEach(columna => {
        const col = columnas.find(element => element.componente.id == columna.componente.id);
        const celda = new Celda();
        celda.id_columna = col.id;
        celda.valor = columna.componente.default;
        celda.fila = fila.index;
        fila.celdas.push(celda);
      });
      tabla.filas.push(fila);

  }
  /*
  @quiero Generar id de celda   
  @para ---- Combinar la fila y la columna en un solo id y poder encontrarlos una vez recibido el error
  @author ---- Geraldo
  @param ---- 
  */
  formar_id(id_columna: string,indice: number){
    var res =id_columna + (indice);
    return res;
  }
  /*
  @quiero Acceder a todos los componentes del DOM   
  @para ---- Leer sus valores para el envío
  @author ---- Geraldo
  @param ---- 
  */
  leer_forma(){
    this.cmp_respuestas = [];
    //Ahora a leer los valores
    console.log('Recorriendo inputs, Inputs length: ',this.inputs.length);
    this.inputs.forEach(input => {
      var id = input.id;
      var valor = input.valor;
      this.buscar_componente(id,valor);
    });
    this.selects.forEach(select => {
      var id = select.id;
      var valor = select.valor;
      this.buscar_componente(id,valor);
    });
    this.toggles.forEach(toggle => {
      var id = toggle.id;
      var valor = toggle.valor;
      this.buscar_componente(id,valor);
    });
    
    //mapear los componentes encontrados al formato de respuesta acordado
      var resp: Respuesta = new Respuesta();
      this.cards_recibidos.forEach(card => {
        var card_enviar: CardRespuesta = new CardRespuesta();
        card_enviar.titulo = card.titulo;
        card.componentes.forEach(comp => {
          card_enviar.componentes.push(this.crear_componente_enviar(comp));
        });
        card.tablas.forEach(tabla => {
          var t: TablaRespuesta = new TablaRespuesta();
          t.id = tabla.id;
          tabla.columnas.forEach(col => {
            var c : ColumnaRespuesta = new ColumnaRespuesta();
            c.id = col.id;
            t.columnas.push(c);
          });
          tabla.filas.forEach(fila => {
            var f: FilaRespuesta = new FilaRespuesta();
            fila.celdas.forEach(celda => {
              var c: CeldaRespuesta = new CeldaRespuesta();
              c.id_columna = celda.id_columna;
              c.valor = celda.valor;
              f.celdas.push(celda);
            });
            t.filas.push(f);
          });
          card_enviar.tablas.push(t);
        });
        resp.cards.push(card_enviar);
      });
      return resp;
    
  }
  /*
  @quiero Comparar dos modelos de componentes   
  @para ---- Poder localizar un componente dentro del DOM
  @author ---- Geraldo
  @param ---- 
  */
  comparar_componente(cmp,id,valor){
    if(cmp.id == id){
      var c = new CmpRespuesta();
      c.id = id;
      c.valor = valor;
      this.cmp_respuestas.push(c);
      cmp.valor = valor;
      return true;
    }
    if(cmp.componentes.length > 0){
      return cmp.componentes.some(c => {
        return this.comparar_componente(c,id,valor);
      });
    }
    return false;
  }
  /*
  @quiero Comparar dos modelos de componente   
  @para ---- Encontrar un componente cuando este pertenece a una tabla
  @author ---- Geraldo
  @param ---- 
  */
  comparar_componente_columna(cmp,id,valor,fila){
    var res : boolean = false;
    var id_col = cmp.id+fila.index;
    if(id_col == id){
      fila.celdas.some(celda => {
        var id_cel = celda.id_columna+celda.fila;
        if(id_cel == id){
          celda.valor = valor;
          var c = new CmpRespuesta();
          c.id = celda.id_columna;
          c.valor = valor;
          c.fila = fila.index;
          this.cmp_respuestas.push(c);
          res = true;
          return true;
        }
      });
    }
    return res;
  }
  /*
  @quiero Buscar un componente dentro de los elementos recibidos   
  @para ---- Leer su valor
  @author ---- Geraldo
  @param ---- 
  */
  buscar_componente(id,valor):boolean{
    var res: boolean = false;
    return this.cards_recibidos.some(card => {
      //Buscar en los componentes del card
      res = card.componentes.some(cmp => {
        if(this.comparar_componente(cmp,id,valor)){
          return true;
        }
        return false;
      });
      //Luego buscar en la tabla
      if(!res){
        res = card.tablas.some(tabla => {
          if(tabla.filas){
            return tabla.filas.some(fila => {
                if(tabla.columnas){
                    return tabla.columnas.some(col => {
                        if (this.comparar_componente_columna(col.componente, id, valor, fila)){
                          return true;
                        }
                        return false;
                    });
                }
            });
          }
          return false;
        });
      }  
      return res;    
    });
  }
  /*
  @quiero Buscar un componente dentro del DOM  
  @para ---- Setear su valor y su error
  @author ---- Geraldo
  @param ---- 
  */
  buscar_componente_error(cmp_respuesta: CmpRespuesta):boolean{
    var res =this.recorrer_arreglo_buscando_componente(<any>this.inputs,cmp_respuesta);
    if(!res){
      res =this.recorrer_arreglo_buscando_componente(<any>this.selects,cmp_respuesta);
    }
    if(!res){
      res =this.recorrer_arreglo_buscando_componente(<any>this.toggles,cmp_respuesta);
    }
    return res;
  }
  /*
  @quiero Recorrer los arreglos que contienen todos los elementos del DOM   
  @para ---- Comparar los elementos con el id recibido para setear su valor y su error
  @author ---- Geraldo
  @param ---- 
  */
  recorrer_arreglo_buscando_componente(arreglo: Array<any>,cmp_respuesta: CmpRespuesta){
    var id = cmp_respuesta.id;
    var valor = cmp_respuesta.valor;
    var error = cmp_respuesta.error;
    error = this.limpiar_texto(error);

    var res = arreglo.some(el => {
      if(el.id == id){
        el.error = error;
        el.valor = valor;
        if(error !== ""){
          //Solo enfoco para el primer error
          if(this.errores_encontrados == 0){
            el.focus('enfocar');
          }
          this.errores_encontrados++;
        }
        return true;
      } else {
        if(cmp_respuesta.fila){
          var id_para_tabla = id+cmp_respuesta.fila;
          if(el.id == id_para_tabla){
            el.error = error;
            el.valor = valor;
            if(error !== ""){
              //Solo enfoco para el primer error
              if(this.errores_encontrados == 0){
                el.focus('enfocar');
              }
              this.errores_encontrados++;
            }
            return true;
          }
        }
      }
      return false;
    });
    return res;
  }
  /*
  @quiero Generar una notificación   
  @para ---- Mostrar los mensajes recibidos como respuesta
  @author ---- Geraldo
  @param ---- 
  */
  mostrar_mensaje(type,text){
    //Limpiar el texto poruqe llega con html
    text = this.limpiar_texto(text);
    switch (type) {
      case 'error':
        this.pnotify.error({
          title: 'Error',
          text: text      
        });
      break;
      case 'warning':
        this.pnotify.warning({
          title: 'Advertencia',
          text: text      
        });
      break;
      case 'success':
        this.pnotify.success({
          title: 'Éxito',
          text: text      
        });
      break;
      case 'info':
        this.pnotify.info({
          title: 'Información',
          text: text      
        });
      break;
      default:
        this.pnotify.success({
          title: 'Éxito',
          text: text      
        });
      break;
    }
  }
  /*
  @quiero Obtener el mensaje dentro de un texto combinado con etiquetas html   
  @para ---- Mostrar la información útil al usuario en forma de notificación
  @author ---- Geraldo
  @param ---- 
  */
  limpiar_texto(texto):string{
    var textos = [];
    var res = "";
    texto = this.escapeHtml(texto);
    if(texto){
      const separadores = ['&gt;','&lt;'];
      textos = texto.split (new RegExp (separadores.join('|'),'g'));
      var filtro1 : string[] = [];
      var texto_a_buscar = ['div','br','span'];
      var texto_a_comparar = ['b','','/b','"'];
      if(textos.length > 0){
        textos.forEach(texto => {
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
        if(filtro1.length > 0){
          filtro1.forEach(el => {
            res = res+el;
          });
        }
      }
    }
    return res;
  }
  /*
  @quiero Reemplazar ciertos caracteres dentro de un string   
  @para ---- Mostrar la información útil al usuario en forma de notificación
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
  @quiero Reemplazar ciertos caracteres dentro de un string   
  @para ---- Mostrar la información útil al usuario en forma de notificación
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
      '&acute;':'á',
      '&ecute;':'é',
      '&icute;':'í',
      '&ocute;':'ó',
      '&ucute;':'ú',
      '&ntilde;':'ñ',
    };
    if(text){
      return text.replace(/&aacute;|&eacute;|&iacute;|&oacute;|&uacute;|&acute;|&ecute;|&icute;|&ocute;|&ucute;|&ntilde;/g, function(m) { return map[m]; });
    }
    return null;
  }
}

