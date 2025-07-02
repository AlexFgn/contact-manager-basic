import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // cambio deteccion optimizado
    // provideZoneChangeDetection() remplaza la deteccion de cambios clasica 
    // por una basada en zonas de multiples eventos mejorara el rendimiento
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    //Enrutamiento
    // provideRouter(routes), inicializa el router de Angular con nuestro conjunto de rutas 
    provideRouter(routes),
     
    // Cliente HTTP 
    // Regustra HttpClient en el inyector global
    // haciendo posible intercalarlo en servicios y componentes
    // para realizar peticiones HTTP (GET, POST ,PUT,etc)
    provideHttpClient()
    ]
};
