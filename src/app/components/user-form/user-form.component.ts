import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  editMode = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
    });

    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.editMode = true;
      this.userService.getUser(this.id).subscribe(data => {
        this.userForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.userService.updateUser({ id: this.id, ...this.userForm.value }).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.userService.addUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
