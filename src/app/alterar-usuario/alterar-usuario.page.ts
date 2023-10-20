import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.page.html',
  styleUrls: ['./alterar-usuario.page.scss'],
})
export class AlterarUsuarioPage implements OnInit {

  usuario!: Usuario;
  confirmarSenha: string = '';
  novaSenha: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
    ) { }

  ngOnInit() {
    // pega o ID que veio pela rota, a palavra id no get foi definida na rota.
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));

    this.usuarioService.getOne(id).subscribe(retorno => {
      this.usuario = retorno;
      console.log(this.usuario)
    });
  }

  salvarUsuario(){

    if(this.confirmarSenha.trim() && this.novaSenha.trim()){

      if(this.confirmarSenha.trim() == this.novaSenha.trim()) {
        this.usuario.senha = this.novaSenha;
      }else{
        alert("As senhas devem ser iguais!")
      }
    }

    this.usuarioService.alterar(this.usuario).subscribe(retorno => {
      this.usuario = retorno;
      alert("SUCESSO! O Usuário [" + this.usuario.id + "] foi salvo!");
      this.router.navigateByUrl('/tabs/tab1');
    });

  }
  
}
