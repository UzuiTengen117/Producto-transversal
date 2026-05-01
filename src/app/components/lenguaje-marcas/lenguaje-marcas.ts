import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lenguaje-marcas',
  standalone: true,
  imports: [Menu, FormsModule, CommonModule],
  templateUrl: './lenguaje-marcas.html',
  styleUrl: './lenguaje-marcas.css',
})
export class LenguajeMarcas {
  // Variables para los 5 elementos de control HTML
  textValue: string = '';
  colorValue: string = '#8b5cf6';
  rangeValue: number = 50;
  dateValue: string = '';
  switchValue: boolean = false;
}
