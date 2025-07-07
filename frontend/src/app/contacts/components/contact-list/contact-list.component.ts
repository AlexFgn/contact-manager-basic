import { Component, OnInit } from '@angular/core';
import { Contact, ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: Contact [] = [];  //Aqui guardamos el array de contactos
  editID: number | null= null; //ID del contacto que estamos editando
  name = ''; //Campos auxiliares para editar
  email =''; 
  phone='';
  loading = false; //flag para desactivar botones mientras carga

  constructor(private svc: ContactService){}

  // Se ejecuta cuando el componente se inicia por primera vez
  ngOnInit(){
    this.load(); //Lanza la carga inicial de contactos
  }
  // load() = pide al servicio todos los contactos
  // this.svc.getAll() devuelve el observable contact
  // susbcribe arranca la llamada HTTP y maneja la respuesta

  load() {
    this.svc.getAll()
    .subscribe(list=>{
      // este callback se ejecuta cuando llegan los datos
      this.contacts = list; //Actualiza el array para que la vista se renderice
    });
  }

  //starEdit (): prepara el formulario en line con los datos del contacto
  startEdit(c:Contact){
    // c.id! = confia en mi, este valor no sera null ni undefine en este momento
    // Este compilador te obliga a manejar en el caso de que el id no exista 
    // en este punto el codigo id tiene valor
    // solamente lo usamos si estamos al 100% de que el valor exista
    this.editID = c.id!; //añadir la exclamacion para que no salga error
    this.name = c.name;
    this.email= c.email;
    this.phone = c.phone || '';
  }

  //save(): Envia los cambios al servidor
  save(c: Contact){
    // validacion basica (si no estan vacios)
    if(!this.name.trim() || !this.email.trim()) return;
    //Actualiza el objeto contact con los nuevos valores
    c.name = this.name;
    c.email = this.email;
    c.phone = this.phone;

    //svc.ipdate(c) ->Observable<Contact>; al suscribirnos
    this.svc.update(c)
      .subscribe(()=>{
        //Este callback se ejecuta cuando la peticion PUT termina existosamente
        this.editID = null; //Salimos del modo edicion
        this.load(); //Volvemos a cargar la lista para ver los cambios
      });
  }
  //cancel () / sale del modo edicion

  cancel(){
    this.editID=null;
  }

  //delete(): Elimina un contacto
  delete(c: Contact){
    // llamamos a confirm() devuelve true si el usuario consumerAfterComputation, false si cancela
    // si cancela, sale return
    if(!confirm(`¿Borra a ${c.name}`)) return;
    this.loading = true; //Desactiva botones mientras llega la respuesta

    // llama al metodo this.delete() del servicio, pasando el ID del contacto
    // c.id! se usa porque en TS necesita estar seguro de que id no es undefined
    this.svc.delete(c.id!)
      .subscribe(()=>{
        //Al completarse la peticion Delete:
        this.loading = false; //reactiva botones
        this.load(); //Refresaca la lista
      })
  }

}
