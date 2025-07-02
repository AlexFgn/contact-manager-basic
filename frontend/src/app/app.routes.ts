// importamos el tipo routes para definir rutas en Angular
import { Routes } from '@angular/router';
import { ContactListComponent } from './contacts/components/contact-list/contact-list.component';
import { ContactAddComponent } from './contacts/components/contact-add/contact-add.component';

// Definimos el array de rutas de la aplicacion
export const routes: Routes = [

    // Ruta raiz (vacia): redirige a contacts
    // pathMatch: 'full' indica que la URL debe coincidir exactamente con las ''
    {path:'', redirectTo:'contacts', pathMatch: 'full'},

    // la ruta contacts muestra la lista de contactos
    {path: 'contacts', component:ContactListComponent},

    // la ruta 'contacts/add' :Me muestra el formulario para añadir el contacto
    {path: 'contacts/add', component: ContactAddComponent},

    // Ruta comodin: ** captura cualquier URL no definida y redirige a contcts
    {path: '**', redirectTo: 'contacts'}
];
