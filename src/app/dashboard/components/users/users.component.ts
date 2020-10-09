import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import * as usersActions from '../../actions/users.actions';
import { customAnimations } from "../../shared/animations/custom-animations";
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormComponent } from './user-form/user-form.component';
import { IUser } from '../../models/user.model';
import { Observable, combineLatest } from 'rxjs';
import { ConfirmService } from '../../shared/services/confirm.service';
import { UsersActions } from '../../actions';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: customAnimations
})
export class UsersComponent implements OnInit {
  // observe users
  users$: Observable<IUser[]> = this.store.pipe(select(fromDashboard.getAllUsers));
  filteredUsers$: Observable<IUser[]> = this.users$;
  filterControl: FormControl;
  filter$: Observable<string>;

  isMobile: boolean;

  // observe pending state while loading users
  loadUsersPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getUsersPagePending)
  );

  // observe error state of the users' page
  loadUsersError$: Observable<string> = this.store.pipe(
    select(fromDashboard.getUsersPageError)
  );

  staticMessages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: this.translate.instant('TableEmptyMessage'),
  
    // Footer total message
    totalMessage: this.translate.instant('Total')
  }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  /**
   * constructor
   * @param store Store
   * @param translate TranslateService
   * @param dialog MatDialog
   * @param snack MatSnackbar
   */
  constructor(
    private store: Store<fromDashboard.State>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    public confirmService: ConfirmService,
    private deviceService: DeviceDetectorService
  ) {

    this.isMobile = deviceService.isMobile();
    this.filterControl = new FormControl('');
    this.filter$ = this.filterControl.valueChanges.pipe(startWith(''));
    
   }

  ngOnInit() {
    // dispatch Load users action 
    this.store.dispatch(new usersActions.LoadUsers());

    if(this.filter$){
      this.filteredUsers$ = combineLatest([this.users$, this.filter$]).pipe(
        map(([users, filterString]) => 
          users.filter(user => 
            [user.firstName,user.lastName,
              user.userName,user.email,
              user.mobilePhone]
            .join().toLowerCase().indexOf(filterString.toLowerCase()) !== -1 || !filterString)
        )
      );
    }
  }

  // add/update appUser
  openPopUp(user: IUser = {}, isNew?) { 
    console.log(user);
    let title = isNew ? this.translate.instant('CreateUserFormTitle'): this.translate.instant('EditUserFormTitle') ;
    let dialogRef: MatDialogRef<any> = this.dialog.open(UserFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: user },
      id: 'userCreationForm'
    });
  }

  // add/update appUser
  openPopUpDblClick(user: IUser = {}, isNew?) { 
    console.log(event[0]);
    let title = isNew ? this.translate.instant('CreateUserFormTitle'): this.translate.instant('EditUserFormTitle') ;
    let dialogRef: MatDialogRef<any> = this.dialog.open(UserFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: user },
      id: 'userCreationForm'
    });
  }

  onSelectRow({selected}) {
    // this.patientSelected.emit(selected[0]);
    const user = selected[0];

    console.log(user);
    // this.store.dispatch(new patientsActions.SelectPatient(patient));
    // this.store.dispatch(new patientsActions.LoadPatientUsers(patient.id))
  }
}