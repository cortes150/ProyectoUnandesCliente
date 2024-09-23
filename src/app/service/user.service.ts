import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}
  obtenerUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  cambiarRol(userId: string, nuevoRol: string) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .update({ rol: nuevoRol });
  }
  eliminarUser(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).delete();
  }
  editarUsuario(userId: string, userData: any) {
    return this.firestore.collection('usuarios').doc(userId).update(userData);
  }
}
