// importa el injectable para que el angular sepa que esta clase es un servicio
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// importa observable para manejar flujos asincronos 
import { Observable } from 'rxjs';

// definicon de la interfaz contact con los campos de contacto
export interface Contact{

  // en typesript? indica que el campo puede estar ausente
  id?: number; //ID opcional (json server lo genera automaticamente al crear)
  name: string; //Nombre de contacto (obligatorio)
  email: string; //email de contacto (obligatorio)
  phone?: string; //telefono (opcional)
}

// marca esta clase como un servicio inyectable en toda la aplicacion
@Injectable({
  providedIn: 'root'
})


export class ContactService {
  // url base de la API JSON server donde se gestion los contactos
  private api = 'http://localhost:3001/contacts'
  // inyecta HttpClient para poder usar metodos HTTP dentro del servicio
  constructor(private http:HttpClient) { }

  // obtiene todos los contactos 
  // observable que emite un array de Contact
  getAll(): Observable<Contact[]>{

    //Get http://localhost:3001/contacts
    return this.http.get<Contact[]>(this.api);
  }

  // añade un nuevo contacto
  // c Contacto a crear
  // observable que emite el Contact creado
  add(c: Contact): Observable<Contact>{
    //POST http://localhost:3001/contacts con el cuerpo c
    return this.http.post<Contact>(this.api, c);
  }

  // actualiza un contacto existente
  // c contacto con datos nuevos (debe incluir id)
  // observable que emite el contact actualizado
  update(c: Contact): Observable<Contact> {

    // put http://localhost:3001/contacts con el cuerpo c
    // `${this.api}/${c.id}`
    // esto contruye la URL del recurso que queremos actualizar
    // this.api
    // ${c.id} accede al id del contacto que queremos actualizar
    return this.http.put<Contact>(`${this.api}/${c.id}`, c);
  }

  // elimina un contacto por id
  // id identificador del contacto a borrar
  // observable que emite void cuando se completa
  // es decir no devuelve nada 'void'
  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
