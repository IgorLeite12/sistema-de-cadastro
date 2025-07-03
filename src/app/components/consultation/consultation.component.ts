import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';
import { Client } from '../registration/client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultation',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent implements OnInit {

  nameSearch: string = '';
  listClients: Client[] = [];
  columnsClient: string[] = ['id', 'name', 'email', 'birthdate', 'cpf', 'action'];
  SnackBar = inject(MatSnackBar);


  constructor(
    private service: ClientService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listClients = this.service.searchClient('');
  }

  search() {
    this.listClients = this.service.searchClient(this.nameSearch);
  }


  prepareEdit(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } })
  }

  prepareDelete(client: Client) {
    client.deleting = true;
  }

  delete(client: Client) {
    this.service.delete(client);
    this.listClients = this.service.searchClient('');
    this.viewMessage('Cliente excluído com sucesso!');
  }

  viewMessage(message: string) {
    this.SnackBar.open(message, '')
    setTimeout(() => {
      this.SnackBar.dismiss();
    }, 3000);
  }
}