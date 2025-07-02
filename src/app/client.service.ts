import { Injectable } from '@angular/core';
import { Client } from './components/registration/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENT = "_CLIENT";
  
  constructor() { }
  
  safe(client: Client){
    const storage = this.getStorage();
    storage.push(client);

    localStorage.setItem(ClientService.REPO_CLIENT, JSON.stringify(storage));
  }

  updateUser(client: Client) {
    const storage = this.getStorage();
    storage.forEach(c => {
      if(c.id === client.id){
        Object.assign(c, client);
      }
    })
    localStorage.setItem(ClientService.REPO_CLIENT, JSON.stringify(storage));
  }

  delete(client: Client) {
    const storage = this.getStorage();

    const newList = storage.filter(c => c.id !== client.id);
    
    localStorage.setItem(ClientService.REPO_CLIENT, JSON.stringify(newList));
  }

  searchClient(nameSearch: string): Client[] {

    const client = this.getStorage();

    if(!nameSearch) {
      return client;
    }
    return client.filter(client => client.name?.indexOf(nameSearch) !== -1);
  }

   searchCLientId(id: string): Client | undefined {
    const client = this.getStorage();
    return client.find(client => client.id === id);
  }

  private getStorage(): Client[] {
    const repositoryStorage = localStorage.getItem(ClientService.REPO_CLIENT);
    if(repositoryStorage) {
      const clients = JSON.parse(repositoryStorage);
      return clients
    }

    const clients: Client[] = [];
    localStorage.setItem(ClientService.REPO_CLIENT, JSON.stringify(clients));
    return clients;
  }
}
