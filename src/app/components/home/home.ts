import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Menu,],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
