import { Component, OnInit } from '@angular/core';
import { CIPHER } from '../../types';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public affirmation: string = '';
  public showAffirm = false;

  ngOnInit() {
    this.affirm();
  }

  public hoverAffirm(show: boolean) {
    this.showAffirm = show;
  }

  private affirm() {
    const arrMsg = [];
    // 'for let... in' accesses the keys of the object
    for (let char in CIPHER) {
      arrMsg.push(char);
    }

    const regex = /[XYZ]/g;
    // sort the keys, then access their values
    this.affirmation = arrMsg
      .sort()
      .reduce((msg, char) => msg + CIPHER[char], '')
      .replace(regex, ' ');
  }

}
