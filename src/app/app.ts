import { Component, signal, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';
import { Loader } from './components/loader/loader';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Loader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  protected readonly title = signal('WebCore');
  public isLoading = signal(false);
  private loaderTimeout: ReturnType<typeof setTimeout> | null = null;
  private lockedScrollY = 0;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly preventScroll = (event: Event): void => {
    if (this.isLoading()) {
      event.preventDefault();
    }
  };

  constructor() {
    const router = inject(Router);
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setLoadingState(true);

        if (this.loaderTimeout) {
          clearTimeout(this.loaderTimeout);
        }

        // Ocultar después de 2 segundos exactamente
        this.loaderTimeout = setTimeout(() => {
          this.setLoadingState(false);
          this.loaderTimeout = null;
        }, 2000);
      }
    });
  }

  private setLoadingState(isLoading: boolean): void {
    this.isLoading.set(isLoading);

    if (!this.isBrowser) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    if (isLoading) {
      this.lockedScrollY = window.scrollY || window.pageYOffset || 0;

      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
      body.style.position = 'fixed';
      body.style.top = `-${this.lockedScrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';

      window.addEventListener('wheel', this.preventScroll, { passive: false });
      window.addEventListener('touchmove', this.preventScroll, { passive: false });
      return;
    }

    html.style.overflow = '';
    body.style.overflow = '';
    body.style.touchAction = '';
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';

    window.removeEventListener('wheel', this.preventScroll);
    window.removeEventListener('touchmove', this.preventScroll);
    window.scrollTo(0, this.lockedScrollY);
  }

  ngOnDestroy(): void {
    if (this.loaderTimeout) {
      clearTimeout(this.loaderTimeout);
      this.loaderTimeout = null;
    }

    if (!this.isBrowser) {
      return;
    }

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.removeEventListener('wheel', this.preventScroll);
    window.removeEventListener('touchmove', this.preventScroll);
  }
}
