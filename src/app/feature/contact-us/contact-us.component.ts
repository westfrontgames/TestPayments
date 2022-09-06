import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  public showReply = false;

  constructor() {}

  ngOnInit(): void {}

  public reasonChanged() {
    this.showReply = true;
  }
}
