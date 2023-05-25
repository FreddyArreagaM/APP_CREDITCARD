import { Injectable } from '@angular/core';
import { TarjetaCredito } from '../models/TarjetaCredito';
import  { AngularFirestore} from '@angular/fire/compat/firestore/';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private tarjeta$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  //Metodo para guardar los datos en la DB
  guardarTarjeta(tarjeta: TarjetaCredito): Promise <any>{
    return this.firestore.collection('tarjeta').add(tarjeta)
  }

  //Metodo para listar los datos de la DB
  listarTarjetas(): Observable <any>{
    //return this.firebase.collection('tarjeta').snapshotChanges(); //Metodo para traer la lista sin ordenamiento
    
    //Metodo para ordenar por la fecha de creacion en orden ascendente
    return this.firestore.collection('tarjeta', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
  }
  
  //Metodo para eliminar un documento(registro) de una colección (tabla)
  eliminarTarjeta(id: any): Promise <any>{
    return this.firestore.collection('tarjeta').doc(id).delete();
  }

  //Metodo para editar un documento dentro de la colección de la DB
  editarTarjeta(id: string, tarjeta: any): Promise <any>{
    return this.firestore.collection('tarjeta').doc(id).update(tarjeta);
  }

  //Metodo para agregar dato al subject observable
  agregarTarjeta(tarjeta: any){
    this.tarjeta$.next(tarjeta);
  }

  //Metodo para obtener los datos del subject y poder visualizarlos desde cualquier componente
  obtenerTarjeta(): Observable <any>{
    return this.tarjeta$.asObservable();
  }


}
