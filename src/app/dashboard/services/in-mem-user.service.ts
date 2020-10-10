import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class InMemUserService implements InMemoryDbService {
  createDb() {
    let users = [
      { 
        id: 1, 
        userName: 'Windstorm',
        firstName: "Calvin",
        lastName: "Odira",
        email: "vino@gmail.com",
        mobilePhone: "045656"
      },
      { 
        id: 2, 
        userName: 'Windstorm',
        firstName: "Calvin",
        lastName: "Odira",
        email: "vino@gmail.com",
        mobilePhone: "0728"
      },
      { 
        id: 3, 
        userName: 'Windstorm',
        firstName: "Calvin",
        lastName: "Odira",
        email: "vino@gmail.com",
        mobilePhone: "045698"
      },
    ];
    return {users};
  }
}
