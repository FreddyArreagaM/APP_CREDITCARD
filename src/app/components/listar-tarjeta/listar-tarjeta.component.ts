import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listadoTarjetas : TarjetaCredito[] = []

  constructor(private _tarjetaService: TarjetaService, private _toastr: ToastrService){

  }
  ngOnInit(){
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.listarTarjetas().subscribe(doc =>{
      setTimeout(() => {
        this.listadoTarjetas = [] //Inicialización del array Tarjetas
        //console.log(doc);
        doc.forEach((element: any) => {
  
          //Asignación de los datos al listado de la tarjeta
          this.listadoTarjetas.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()// '...' se usan para referenciar una copia de todos los elementos restantes que contiene el documento
          });
          //console.log(element.payload.doc.id); //Obtencion del id del documento respectivo
          //console.log(element.payload.doc.data()); //Obtencion con metodo data() los datos del documentos
        })
      }, 1500);
    })
  }

  eliminarTarjeta(id: any){
    this._tarjetaService.eliminarTarjeta(id).then(() => {
      this._toastr.error('Registro eliminado exitosamente', 'Tarjeta Eliminada');
    }, error =>{
      this._toastr.error('Oopss... ', 'Error al eliminar la tarjeta');
      console.log(error);
    });
  }

  editarTarjeta(tarjeta:any){
    this._tarjetaService.agregarTarjeta(tarjeta);
  }

}
