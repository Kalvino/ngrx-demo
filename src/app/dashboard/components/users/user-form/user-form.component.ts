import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UsersApiActions, UsersActions } from '../../../actions';
import { IUser } from '../../../models/user.model';
import { ConfirmService } from '../../../shared/services/confirm.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { ConcatSource } from 'webpack-sources';


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles: Observable<any>;
  selectedRole:any= "nillll";
  addPasswordFields = true;
  editMode: boolean;
  roles = [];

  globalAdmin: boolean;
  servicePartner: string;

  passwordPattern = "^.*(?=.{8,255})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$"

  @ViewChild('rolesInput', {static: false}) rolesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  // observe user creation pending state
  createUserPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getUserCreationPending)
  );

  // observe errors while saving the user
  saveUserErrorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getUserCreationError)
  );



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private fb: FormBuilder,
    private store: Store<fromDashboard.State>, 
    public translate: TranslateService,
    public confirmService: ConfirmService
  ) { 
    
    
  }

  ngOnInit() {

    // build organization form
    this.buildUserForm(this.data.payload)    
    
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const passwordConfirmation: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== passwordConfirmation) {
      // if they don't match, set an error in our passwordConfirmation form control
      control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
    }else{
     if ( control.getError('NoPasswordMatch')){
       control.setErrors(null);
     }
      return null
    }
  }

  filterRoles(userType){
    this.roles
  }

  buildUserForm(user){

    if (user.firstName){
      // remove password fields from the dom if editing
      this.addPasswordFields = false;

      /**
       * Create userForm group to edit user details
       */
      this.userForm = this.fb.group({
        _id: [user._id || ''],
        firstName: [user.firstName || '' ,Validators.required],
        lastName: [user.lastName || '' ,Validators.required],
        userName: [user.userName || '' ,Validators.required],
        email: [user.email || '' ,[Validators.email, Validators.required]],
        mobilePhone: [user.mobilePhone || '', Validators.required ],
      })

      this.editMode = true;

    }else{
      /**
       * Create a new userForm group to collect user details
       */
      this.userForm = this.fb.group({
        firstName: ['' ,Validators.required],
        lastName: ['' ,Validators.required],
        userName: ['' ,Validators.required],
        email: ['' ,[Validators.email]],
        mobilePhone: ['' ],
        password: ['' ,[Validators.required]],
        confirmPassword: ['' ,Validators.required],
      });

      this.editMode = false;
    }
    

  }

  /**
   * dispatch new create user action when form is submitted
   * @param user
   */
  submit() {
    if (this.userForm.valid) {
      let user = this.userForm.value;
      console.log(user); 

      if (user._id){
        this.store.dispatch( new UsersActions.EditUser(user))        
      }else{
        this.store.dispatch(new UsersActions.CreateUser({user}));
      }
    }
    // this.dialogRef.close(this.organizationForm.value)
  }


  /**
   * dismiss the open organization form dialogue with confirmation if
   * the form has unsaved data
   */
  cancel(){
    if (this.userForm.dirty){
      const title = this.translate.instant("ConfirmActionTitle");
      const message = this.translate.instant("ConfirmActionMessage");
      this.confirmService.confirm({title: title, message: message})
      .subscribe(res => {
        if (res){
          this.store.dispatch(new UsersActions.DismissUserFormDialog());
        }
      })
    }else{
      this.store.dispatch(new UsersActions.DismissUserFormDialog());
    }
  }

  remove(role: string): void {
    console.log(role);
    // const index = this.roles.indexOf(role);

    // if (index >= 0) {
    //   this.roles.splice(index, 1);
    // }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    // this.roles.push(event.option.viewValue);
    console.log(this.rolesInput.nativeElement.value);
    this.rolesInput.nativeElement.value = '';
    this.userForm.controls['role'].setValue(null);
  }

  // delete User
  deleteUser(){
    const userId = this.data.payload._id
    const userName = this.data.payload.userName
    console.log(userId)
    const title = this.translate.instant("DeleteUserTitle");
    const message = this.translate.instant("DeleteUserMessage", {userName: userName} );

    this.confirmService.confirm({title: title, message: message})
    .subscribe(res => {
      if (res) {
        this.store.dispatch(new UsersActions.DeleteUser(userId));
      }
    })
  }
}
