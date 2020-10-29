import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Skill} from '../models/Skill';
import {Network} from '../models/Network';
import {FrameContent} from '../models/FrameContent';
import {FrameItem} from '../models/FrameItem';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: ['./back-office.component.css'],
})
export class BackOfficeComponent implements OnInit {

    userForm: FormGroup;
    user: User;

    constructor(private fb: FormBuilder, private userService: UserService) {}

    ngOnInit(): void {
        this.getUser();
        setTimeout(() => {}, 2000);
        this.createForm();
    }

    createForm() : void {
        // Mettre des validators ?
        // .fb.group = new FormGroup
        this.userForm = this.fb.group({
            inFirstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            inLastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            inMail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            inPhone: ['', [Validators.required, Validators.pattern('^[0-9 %+]+')]],
            inDate: [''],
            inAddress: ['', [Validators.required]],
            inBio: [''],

        });
    }

    // inputChildMap(): {
    //
    // }

    getUser(): void {
        this.userService.getUserById(1).subscribe(data => {
            this.user = data;
        });
    }

    updateUserFromForm(): void {
        this.user.logo = 'Raphael';
        this.user.firstName = this.userForm.get('inFirstname').value;
        this.user.lastName = this.userForm.get('inLastname').value;
        this.user.email = this.userForm.get('inMail').value;
        this.user.bio = this.userForm.get('inBio').value;
        this.user.phoneNumber = this.userForm.get('inPhone').value;
        this.user.birthDate = this.userForm.get('inDate').value;
        this.user.address = this.userForm.get('inAddress').value;
        // TODO : Ajouter la liste d'objet : socialLink = LISTE
        // this.user.socialLink.push(new Network({
        //     name: this.userForm.get('inSocial').value,
        //     link: '',
        //     logo: '',
        // }));
        this.user.skills.push(new Skill({
            name: 'Toto',
            level: 3,
            logo: '',
        }));
        this.user.frame.push(new FrameContent({
                title: '',
                logo:'',
                frameItem: [new FrameItem({
                    title:'item name',
                    content:'content of the item',
                })],
            }
        ));
        this.userService.updateUser(this.user).subscribe();
    }
}
