import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../../client.service';
import { Client } from './client';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-registration',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
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

  constructor(
    private service: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any ) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clientFound = this.service.searchCLientId(id);
        if (clientFound) {
          this.update = true;
          this.client = clientFound;
        }
      }
    })
  }

    safeClient() {
      if(!this.update) {
        this.service.safe(this.client);
        this.client = Client.newClient();
        this.viewMessage('Cliente cadastrado com sucesso!');
      } else {
        this.service.updateUser(this.client);
        this.router.navigate(['/clientes']);
        this.viewMessage('Cliente atualizado com sucesso!');
      }
  }

  viewMessage(message: string) {
    this.SnackBar.open(message, '')
    setTimeout(() => {
      this.SnackBar.dismiss();
    }, 3000);
  }
}
