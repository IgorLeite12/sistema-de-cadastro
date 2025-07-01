import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../../client.service';
import { Client } from '../registration/client';
import { Router } from '@angular/router';

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
export class ConsultationComponent implements OnInit  {

  nameSearch: string = '';
  listClients: Client[] = [];
  columnsClient: string[] = ['id', 'name', 'email', 'birthdate', 'cpf', 'action'];

  constructor(
    private service: ClientService,
    private router: Router
  ){

  }

  ngOnInit() {
    this.listClients = this.service.searchClient('');
  }

  search(){
    this.listClients = this.service.searchClient(this.nameSearch);
  }


  prepareEdit(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } } )
}

}
