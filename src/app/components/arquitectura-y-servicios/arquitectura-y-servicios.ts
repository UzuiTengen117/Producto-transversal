import { Component } from '@angular/core';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-arquitectura-y-servicios',
  standalone: true,
  imports: [Menu],
  templateUrl: './arquitectura-y-servicios.html',
  styleUrl: './arquitectura-y-servicios.css',
})
export class ArquitecturaYServicios {
  showAnim = false;

  showAnimation() {
    this.showAnim = !this.showAnim;
  }
}
