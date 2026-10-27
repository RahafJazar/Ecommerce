import { afterNextRender, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('AldoraCart');
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  constructor(private flowbite: FlowbiteService) {
    afterNextRender(() => {
      //browser mode 
      console.log(document.title)
    })
  }
  ngOnInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite()
    })



  }

}


