import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// metadata del componente
@Component({
  selector: 'app-contact-add', //Etiqueta Html con la que enlazamos en app.html
  imports: [CommonModule,FormsModule],  //Modulos que utiliza este component
  templateUrl: './contact-add.component.html', //ruta del archivo html
  styleUrl: './contact-add.component.css'
})

  


export class ContactAddComponent {
  //propiedades del componente - enlazado con [{ngModel}]
  name=''; //nombre del nuevo contacto
  email=''; //email del nuevo contacto
  phone=''; //el telefono del nuevo contacto

  //inyeccion de dependencias
  // svc= es la instancia de ContactService para llamar a la API o logica de datos
  // router= para redirigir tras guardar
  constructor(
    private svc: ContactService,
    private router: Router
  ){}

  // Metodo que se ejecuta al enviar el formulario (NGSubmit)=save()
  save(){
    // validacion basica en typescrip (TS) ademas de la validacion en el template
  
  if(this.name.trim() || !this.email.trim()){

    // si name o email estan vacios o solo espacios
    alert('Nombre y email obligatorios');
    return;
  }

  // llamada al servicio para añadir el contacto
  this.svc.add({
    name: this.name,
    email: this.email,
    phone: this.phone
  })

  // cuando el observable indica que ya ha recibido los datos, el subscribe ejecutara el redireccionamiento
  .subscribe(()=>
    this.router.navigate(['/contacts'])
  );
  
}
}
