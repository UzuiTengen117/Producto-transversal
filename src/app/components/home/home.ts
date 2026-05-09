import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Menu, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
