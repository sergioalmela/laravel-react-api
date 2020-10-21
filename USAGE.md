## Requisitos

Se ha usado  la última versión de Laravel, 8.10.0 junto con la versión de PHP 7.4.8

## Iniciar proyecto

Para el desarrollo del proyecto se ha arrancado el proyecto mediante el comando php artisan serve.

Entonces, el proyecto es accesible desde http://127.0.0.1:8001/ (si tenemos el proyecto de la API en el puerto 8000 arrancado)

En el código he hecho que se conecte a la API desde el puerto 8001 hacia el 8000, que es el servidor de la API

### Librerías

Con composer se ha instalado UI con composer require laravel/ui y react con php artisan ui react

Posteriormente, se han instaldo los paquetes requeridos con npm install

Una vez creados nuestros js necesarios para ejecutar la aplicación, hemos ejecutado npm run watch
