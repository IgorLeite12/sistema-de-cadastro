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
import { City, State } from '../../brasil-api.models';
import { BrasilApiService } from '../../brasil-api.service';
import { ClientService } from '../../client.service';
import { Client } from './client';
import { CommonModule } from '@angular/common';

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
  state: State[] = [];
  city: City[] = [];

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
            this.loadCity(event as MatSelectChange)
          }
        }
      }
    })
    return this.loadStates();

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

  clearFields() {
    this.client = Client.newClient();
    this.client.birthdate = ''
    this.update = false;
    this.city = [];
    this.state = [];
    this.viewMessage('Campos limpos com sucesso!');
  }

  loadStates() {
    this.brasilApiService.listarUFs().subscribe({
      next: listStates => this.state = listStates,
      error: error => console.error('Erro ao carregar estados:', error)
    })
  }

  loadCity(event: MatSelectChange) {
    const ufSelected = event.value;
    this.brasilApiService.listarMunicipios(ufSelected).subscribe({
      next: listCity => this.city = listCity,
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
