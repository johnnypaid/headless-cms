import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  sendData: any;
  contactContent: any;
  currentPage = '';
  pageTitle = '';
  contSections = {};
  addresSection = [];

  constructor(
    private contactService: ContactService,
    private contContent: ContentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        const name = params.get('name');
        this.currentPage = name;
        this.getContact(this.currentPage);
      });
  }

  submit(f) {
    const cont = f.form.controls;

    if (cont.name.value === '') {
      document.getElementById('name').focus();
    } else if (cont.position.value === '') {
      document.getElementById('position').focus();
    } else if (cont.compname.value === '') {
      document.getElementById('compname').focus();
    } else if (cont.email.value === '') {
      document.getElementById('email').focus();
    } else if (cont.tel.value === '') {
      document.getElementById('tel').focus();
    } else if (cont.message.value === '') {
      document.getElementById('message').focus();
    } else {
      this.sendData = this.contactService.sendContact(f.value)
        .subscribe( resdata => {
          console.log(resdata);
        }, error => {
          console.log(error.message);
        });
    }
  }

  getContact(page){
    this.contContent.getContent(page)
      .subscribe(resData => {
        this.contactContent = resData;
        if (page !== 'products') {
          this.contSections = this.contactContent.page.sections;
          this.addresSection = this.contactContent.page.sections[0].contents;
          this.pageTitle = this.contactContent.page.title;
        }
      });
  }

}
