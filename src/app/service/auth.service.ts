import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  registrar(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    rol: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return this.firestore.collection('usuarios').doc(result.user?.uid).set({
          nombre,
          apellido,
          email,
          rol,
        });
      });
  }
  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((credencialesUsuario) => {
        const uid = credencialesUsuario.user?.uid;
        return this.firestore.collection('usuarios').doc(uid).get();
      });
  }
  logout() {
    return this.afAuth.signOut();
  }
}
