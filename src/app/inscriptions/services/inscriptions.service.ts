import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { Inscription, Student } from '../../core/models';
import { CoursesService } from '../../courses/services/courses.service';
import { StudentService } from '../../students/services/student.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private courses$: Observable<string[]>;

  private inscriptions$ = new BehaviorSubject<Inscription[]>([])

  private inscriptionsStudentsList$: Observable<string[]>;

  private inscriptionsMentors$ = new BehaviorSubject<string[] | null>(null);

  apiBaseInscriptions = `${enviroment.apiBaseUrl}/inscriptions`;

  constructor(
    private httpClient: HttpClient,
    private coursesService: CoursesService,
    private studentService: StudentService
  ) {
    this.courses$ = this.coursesService.getCoursesList()
      .pipe(
        map((courses) => courses.map((course) => course.courseName))
      )

    this.inscriptionsStudentsList$ = this.studentService.getStudentList()
      .pipe(
        map((students: Student[]) => students.map((student) => `${student.name} ${student.surname}`))
      )
  
    this.httpClient.get<string[]>(`${enviroment.apiBaseUrl}/mentors`)
      .subscribe({
        next: (mentors) => {
          this.inscriptionsMentors$.next(mentors);
        }
      })

    this.getInscriptions();
  }

  getInscriptions(): void {
    this.httpClient.get<Inscription[]>(this.apiBaseInscriptions)
      .subscribe({
        next: (inscriptions) => {
          this.inscriptions$.next(inscriptions);
        }
      })
  }

  addInscription(inscriptionValue: Inscription): void {
    this.httpClient.post<Inscription>(
      this.apiBaseInscriptions, inscriptionValue
    )
    .pipe(take(1))
    .subscribe(
      (inscription) => {
        this.inscriptions$.asObservable().pipe(take(1)).subscribe((inscriptions) => this.inscriptions$.next([ ...inscriptions, inscription ]))
      }
    )
  }

  editInscription(id: number, inscription: Inscription): void {
    this.httpClient.put(this.apiBaseInscriptions + `/${id}`, inscription)
    .pipe(take(1))
    .subscribe(() => this.getInscriptions())
  }

  deleteInscription(id: number): void {
    this.httpClient.delete(this.apiBaseInscriptions + `/${id}`)
    .pipe(take(1))
    .subscribe(() => this.getInscriptions())
  }

  getInscriptionsList(): Observable<Inscription[]> {
    return this.inscriptions$.asObservable();
  }

  getInscriptionDetail(commission: number): Observable<Inscription | undefined> {
    return this.inscriptions$.asObservable()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.find((inscription) => inscription.commission === commission))
      )
  }

  getInscriptionsStudents(): Observable<string[]> {
    return this.inscriptionsStudentsList$;
  }

  getInscriptionsMentors(): Observable<string[] | null> {
    return this.inscriptionsMentors$.asObservable();
  }

  getListOfCourses(): Observable<string[]> {
    return this.courses$;
  }
}
