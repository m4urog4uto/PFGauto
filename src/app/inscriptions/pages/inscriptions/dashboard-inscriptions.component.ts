import { Component } from '@angular/core';
import { InscriptionsService } from '../../services/inscriptions.service';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { Inscription } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormInscriptionComponent } from '../../components/ModalFormInscriptions/modal-form-inscriptions.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-inscriptions',
  templateUrl: './dashboard-inscriptions.component.html',
  styleUrls: ['./dashboard-inscriptions.component.css']
})
export class DashboardInscriptionsComponent {
  inscriptions: Inscription[] = [];
  destroyed$ = new Subject<void>();
  role$: Observable<string | undefined>;

  constructor(
    private inscriptionsService: InscriptionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: MatDialog,
    private authService: AuthService
  ) {
    this.role$ = this.authService.getAuthUser().pipe(map((user) => user?.role));
    this.inscriptionsService.getInscriptionsList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscriptions) => this.inscriptions = inscriptions);
  }

  addInscriptionForm(): void {
    const dialogo = this.dialogService.open(ModalFormInscriptionComponent, {
      data: {
        inscription: {
          commission: '',
          courseName: '',
          mentors: [],
          students: []
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      if (result) {
        this.inscriptions = [ ...this.inscriptions, result ];
        this.inscriptionsService.addInscription(result);
      }
    });
  }

  editInscription(id: number): void {
    const inscriptionId = this.inscriptions.find((obj) => obj.id === id);
    if (inscriptionId) {
      const { id, commission, courseName, mentors, students } = inscriptionId;
      const dialogo = this.dialogService.open(ModalFormInscriptionComponent, {
        data: {
          inscription: {
            id,
            commission,
            courseName,
            mentors,
            students
          }
        }
      });

      dialogo.afterClosed().subscribe((result: Inscription) => {
        if (result) {
          this.inscriptionsService.editInscription(id, result);
        }
      });
    }
  }

  removeInscription(id: number): void {
    const inscriptionId = this.inscriptions.findIndex((obj) => obj.id === id);
    if (inscriptionId > -1) {
      this.inscriptions.splice(inscriptionId, 1);
    };

    this.inscriptions = [ ...this.inscriptions ];
    this.inscriptionsService.deleteInscription(id);
  }

  detailInscription(comnission: number): void {
    this.router.navigate([comnission], {
      relativeTo: this.activatedRoute
    })
  }
}
