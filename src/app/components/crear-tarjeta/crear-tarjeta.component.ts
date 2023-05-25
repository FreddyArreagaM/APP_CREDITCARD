import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit{

  //Declaración de tipo de formulario reactivo a utilizar
  formTarjeta: FormGroup;
  //Variable para control del spinner
  loading = false;
  titulo = 'CREAR TARJETA';
  button = 'Aceptar';
  name = 'fa-sharp fa-solid fa-database';
  id: string | undefined;

  constructor(private form: FormBuilder, private _tarjetaService: TarjetaService, private _toastr: ToastrService){
    this.formTarjeta = this.form.group({
      //Inicialización de las variables del formulario y la validación respectiva.
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
  }

  ngOnInit(){
    //Llamado a escuchar el subject dentro de este componente
    this._tarjetaService.obtenerTarjeta().subscribe(data => {
      this.button='Actualizar';
      this.name='fa-solid fa-repeat';
      this.titulo = 'EDITAR TARJETA';
      this.formTarjeta.get('titular')?.setValue(data.titular);
      this.formTarjeta.get('numeroTarjeta')?.setValue(data.numeroTarjeta);
      this.formTarjeta.get('cvv')?.setValue(data.cvv);
      this.formTarjeta.get('fechaExpiracion')?.setValue(data.fechaExpiracion);
      this.id = data.id;
    })
  }

  crearTarjeta(){
    if(this.id == undefined){
      //Metodo para crear la Tarjeta
      this.guardarTarjeta();
    }else{ 
      //Metodo para actualizar datos de la Tarjeta
      this.editarTarjeta(this.id);
    }
    this.resetF();
  }

  resetF(){
    this.id = undefined;
    this.button = 'Aceptar'
    this.titulo = 'CREAR TARJETA';
    this.name = 'fa-sharp fa-solid fa-database';
  }

  guardarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.formTarjeta.value.titular,
      numeroTarjeta: this.formTarjeta.value.numeroTarjeta,
      fechaExpiracion: this.formTarjeta.value.fechaExpiracion,
      cvv: this.formTarjeta.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
      //instancia para ejectuar el spinnner
      this.loading=true;

      //Instancia para enviar los datos al metodo guardar del servicio
      this._tarjetaService.guardarTarjeta(TARJETA).then(() => {
        this.loading=false;
        console.log("Registro exitoso");
        this._toastr.success('La tarjeta fue registrada con éxito!', 'Tarjeta Registrada');   
        this.formTarjeta.reset();
      }, error =>{
        console.log(error);
        this.loading=false;
        this._toastr.error('Oops!..','Error en el registro')
      });
  }

  editarTarjeta(id: any){
    const TARJETA: any = {
      titular: this.formTarjeta.value.titular,
      numeroTarjeta: this.formTarjeta.value.numeroTarjeta,
      fechaExpiracion: this.formTarjeta.value.fechaExpiracion,
      cvv: this.formTarjeta.value.cvv,
      fechaActualizacion: new Date(),
    }

    //instancia para ejectuar el spinnner
    this.loading = true;

    //Instancia para enviar los datos al metodo editar del servicio
    this._tarjetaService.editarTarjeta(id,TARJETA).then(()=>{
      this.loading = false;
      this._toastr.success('La tarjeta fue actualizada con éxito!', 'Tarjeta Actualizada'); 
      this.formTarjeta.reset();
    }, error =>{
      console.log(error);
      this.loading=false;
      this._toastr.error('Oops!..','Error en el registro')
    });
  }
}
