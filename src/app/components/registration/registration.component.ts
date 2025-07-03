import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cidades, Estados } from '../../brasil-api.models';
import { BrasilApiService } from '../../brasil-api.service';
import { ClientService } from '../../client.service';
import { Client } from './client';
import { CommonModule } from '@angular/common';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-registration',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelect,
    MatOption,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    NgxMaskDirective
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit {

  client: Client = Client.newClient();
  update: boolean = false;
  SnackBar = inject(MatSnackBar);
  estado: Estados[] = [];
  cidade: Cidades[] = [];

  constructor(
    private service: ClientService,
    private brasilApiService: BrasilApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clientFound = this.service.searchCLientId(id);
        if (clientFound) {
          this.update = true;
          this.client = clientFound;
          if(this.client.uf) {
            const event = { value: this.client.uf }
            this.carregarCidades(event as MatSelectChange)
          }
        }
      }
    })
    return this.carregarEstados();

  }

  safeClient() {
    if (!this.update) {
      this.service.safe(this.client);
      this.client = Client.newClient();
      this.viewMessage('Cliente cadastrado com sucesso!');
    } else {
      this.service.updateUser(this.client);
      this.router.navigate(['/clientes']);
      this.viewMessage('Cliente atualizado com sucesso!');
    }
  }

  carregarEstados() {
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstado => this.estado = listaEstado,
      error: error => console.error('Erro ao carregar estados:', error)
    })
  }

  carregarCidades(event: MatSelectChange) {
    const ufSelected = event.value;
    this.brasilApiService.listarMunicipios(ufSelected).subscribe({
      next: listaCidades => this.cidade = listaCidades,
      error: error => console.error('Erro ao carregar cidades:', error)
    })
  }

  viewMessage(message: string) {
    this.SnackBar.open(message, '')
    setTimeout(() => {
      this.SnackBar.dismiss();
    }, 3000);
  }
}
