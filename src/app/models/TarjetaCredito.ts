//Clase principal que maneja las variables del controlador 

//Esto es el MODELO en el patrón MVC

export class TarjetaCredito{
    //Creación de variables para usarlas al guardar en firebase
    id?: string;
    titular: string;
    numeroTarjeta: string;
    fechaExpiracion: string;
    cvv: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

    //Inicialización de las variables a usar
    constructor(titular: string, numeroTarjeta: string, fechaExpiracion: string, cvv: number){
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.fechaExpiracion = fechaExpiracion;
        this.cvv = cvv;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
    }
}