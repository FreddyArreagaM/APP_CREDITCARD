import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from '@angular/fire/compat'
import { FirestoreModule, getFirestore, provideFirestore} from '@angular/fire/firestore'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { CrearTarjetaComponent } from './components/crear-tarjeta/crear-tarjeta.component';
import { ListarTarjetaComponent } from './components/listar-tarjeta/listar-tarjeta.component';
import { enviroment } from 'src/environments/environment.prod';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

@NgModule({
  declarations: [
    AppComponent,
    CrearTarjetaComponent,
    ListarTarjetaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    FirestoreModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    provideFirebaseApp(() => initializeApp({})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
