import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  imports: [],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
})
export class TopComponent {
  private router = inject(Router);

  onClickNavigate(): void {
    this.router.navigate(['/attendance/a']).then();
  }
}
