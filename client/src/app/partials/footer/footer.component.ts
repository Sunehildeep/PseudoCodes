import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    const copyright = `<p> © ${year} Copyright PseudoCodes </p>`;
    const date = document.getElementById("copyright-year")!;
    date.innerHTML = copyright;
  }

}
