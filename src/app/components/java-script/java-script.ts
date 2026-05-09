import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Menu } from '../menu/menu';

type TopicLevel = 'basico' | 'intermedio' | 'avanzado';

interface LevelBundle {
  level: TopicLevel;
  label: string;
  topics: string[];
}

@Component({
  selector: 'app-java-script',
  imports: [Menu],
  templateUrl: './java-script.html',
  styleUrl: './java-script.css',
})
export class JavaScript implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('jsHeadline') private headlineRef?: ElementRef<HTMLElement>;
  @ViewChild('jsConceptList') private listRef?: ElementRef<HTMLUListElement>;
  @ViewChild('jsSummary') private summaryRef?: ElementRef<HTMLElement>;
  @ViewChild('jsTopicBadge') private badgeRef?: ElementRef<HTMLElement>;
  @ViewChild('jsProgressHint') private progressRef?: ElementRef<HTMLElement>;
  @ViewChild('jsLevel') private levelRef?: ElementRef<HTMLSelectElement>;

  private readonly catalog: LevelBundle[] = [
    {
      level: 'basico',
      label: 'Básico',
      topics: [
        'Variables let y const',
        'Tipos y typeof',
        'Condicionales if / else',
        'Bucles for y for...of',
        'Funciones declaradas y flecha',
        'Operadores y coerción',
      ],
    },
    {
      level: 'intermedio',
      label: 'Intermedio',
      topics: [
        'Arrays y métodos (map, filter)',
        'Objetos y desestructuración',
        'DOM: querySelector y createElement',
        'Eventos addEventListener',
        'JSON.parse y stringify',
        'try / catch y errores',
      ],
    },
    {
      level: 'avanzado',
      label: 'Avanzado',
      topics: [
        'Promesas y async / await',
        'Modules (import / export)',
        'Closures y ámbito léxico',
        'Delegación de eventos',
        'Rendimiento y reflow mínimo',
        'TypeScript a alto nivel',
      ],
    },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.buildList();
    }
  }

  /** Invocado desde el botón y al cambiar el nivel (enlaces en la plantilla = siempre fiable). */
  buildList(): void {
    const headline = this.headlineRef?.nativeElement;
    const listEl = this.listRef?.nativeElement;
    const summaryEl = this.summaryRef?.nativeElement;
    const badgeEl = this.badgeRef?.nativeElement;
    const progressEl = this.progressRef?.nativeElement;
    const levelSelect = this.levelRef?.nativeElement;

    if (
      !headline ||
      !listEl ||
      !summaryEl ||
      !badgeEl ||
      !progressEl ||
      !levelSelect
    ) {
      return;
    }

    const matched = this.resolveBundle(levelSelect.value as TopicLevel);

    if (!matched) {
      headline.textContent = 'Nivel no reconocido.';
      badgeEl.textContent = '0 temas';
      listEl.replaceChildren();
      summaryEl.textContent = 'Selecciona un nivel válido.';
      this.syncProgress(listEl, progressEl);
      return;
    }

    headline.textContent = `Temas sugeridos — nivel ${matched.label}`;
    listEl.replaceChildren();

    const topics = matched.topics;
    let inserted = 0;

    for (let j = 0; j < topics.length; j++) {
      const li = document.createElement('li');
      li.setAttribute('role', 'listitem');
      li.tabIndex = 0;
      li.textContent = `${j + 1}. ${topics[j]}`;

      if (j % 2 === 0) {
        li.classList.add('row-alt');
      }

      if (topics[j].length > 28) {
        li.classList.add('long-line');
      }

      listEl.appendChild(li);
      inserted++;
    }

    badgeEl.textContent = inserted === 1 ? '1 tema' : `${inserted} temas`;

    if (inserted === 0) {
      summaryEl.textContent = 'No hay temas definidos para este nivel.';
    } else if (inserted < 4) {
      summaryEl.textContent = `Lista corta: ${inserted} tema(s).`;
    } else {
      summaryEl.textContent = `Se listaron ${inserted} temas para el nivel ${matched.label}.`;
    }

    this.syncProgress(listEl, progressEl);
  }

  clearList(): void {
    const headline = this.headlineRef?.nativeElement;
    const listEl = this.listRef?.nativeElement;
    const summaryEl = this.summaryRef?.nativeElement;
    const badgeEl = this.badgeRef?.nativeElement;
    const progressEl = this.progressRef?.nativeElement;

    if (
      !headline ||
      !listEl ||
      !summaryEl ||
      !badgeEl ||
      !progressEl
    ) {
      return;
    }

    headline.textContent = 'Lista vacía.';
    badgeEl.textContent = '—';
    listEl.replaceChildren();
    summaryEl.textContent = 'Pulsa «Generar lista» o cambia el nivel.';
    this.syncProgress(listEl, progressEl);
  }

  onListClick(ev: MouseEvent): void {
    const listEl = this.listRef?.nativeElement;
    const progressEl = this.progressRef?.nativeElement;
    if (!listEl || !progressEl) {
      return;
    }
    const target = ev.target;
    if (!(target instanceof HTMLElement) || target.tagName !== 'LI') {
      return;
    }
    target.classList.toggle('done');
    this.syncProgress(listEl, progressEl);
  }

  onListKeydown(ev: KeyboardEvent): void {
    if (ev.key !== 'Enter' && ev.key !== ' ') {
      return;
    }
    const listEl = this.listRef?.nativeElement;
    const progressEl = this.progressRef?.nativeElement;
    if (!listEl || !progressEl) {
      return;
    }
    const target = ev.target;
    if (!(target instanceof HTMLElement) || target.tagName !== 'LI') {
      return;
    }
    ev.preventDefault();
    target.classList.toggle('done');
    this.syncProgress(listEl, progressEl);
  }

  private resolveBundle(selectedLevel: TopicLevel): LevelBundle | undefined {
    for (let i = 0; i < this.catalog.length; i++) {
      if (this.catalog[i].level === selectedLevel) {
        return this.catalog[i];
      }
    }
    return undefined;
  }

  private syncProgress(
    listEl: HTMLUListElement,
    progressEl: HTMLElement,
  ): void {
    const items = listEl.querySelectorAll('li');
    let done = 0;
    for (let k = 0; k < items.length; k++) {
      if (items[k].classList.contains('done')) {
        done++;
      }
    }
    const n = items.length;
    if (n === 0) {
      progressEl.textContent =
        'Genera una lista para poder marcar temas como revisados.';
    } else if (done === 0) {
      progressEl.textContent = 'Pulsa una fila cuando hayas repasado ese tema.';
    } else if (done === n) {
      progressEl.textContent = `¡Listo! Marcaste los ${n} temas como revisados.`;
    } else {
      progressEl.textContent = `Llevas ${done} de ${n} temas marcados como revisados.`;
    }
  }
}
