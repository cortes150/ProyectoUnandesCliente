import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMensaje = '';
  constructor(private authService: AuthService, private route: Router) {}
  login() {
    this.authService
      .login(this.email, this.password)
      .then((doc) => {
        doc.subscribe((infUsuario) => {
          if (infUsuario.exists) {
            const userD: any = infUsuario.data();
            if (userD.rol === 'admin') {
              this.route.navigate(['/admin']);
            } else {
              this.route.navigate(['/bienvenida']);
            }
          }
        });
      })
      .catch((error) => {
        this.errorMensaje = 'Contraseña o Usuario incorrectos';
      });
  }
  goToRegister() {
    this.route.navigate(['/registro']);
  }
}
