import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  users: any[] = [];
  selectedUser: any = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.obtUsuarios();
  }

  obtUsuarios() {
    this.userService.obtenerUsuarios().subscribe((res) => {
      this.users = res.map((e) => ({
        id: e.payload.doc.id,
        ...(e.payload.doc.data() as {}),
      }));
    });
  }
  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('error aal cerrar sesión', error);
      });
  }
  cambiarRol(userId: string, nuevoRol: string) {
    this.userService.cambiarRol(userId, nuevoRol);
  }
  editUser(user: any) {
    this.selectedUser = { ...user };
  }
  deleteUser(userId: string) {
    this.userService.eliminarUser(userId);
  }
  saveUser() {
    if (this.selectedUser) {
      console.log(this.selectedUser);

      this.userService.editarUsuario(this.selectedUser.id, this.selectedUser);
      this.selectedUser = null;
    }
  }
}
