import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseRequest, CinemaDTO } from '@ultraplex-app/api';
import { Observable } from 'rxjs';
import { DataTableColumn } from '../../@shared/common/@models/data-table';
import { CinemasFacadeService } from '../cinemas.facade.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCinemaDialogComponent } from '../create-cinema-dialog/create-cinema-dialog.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list.component.html',
  styleUrls: ['./cinemas-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinemasListComponent implements OnInit {

  cinemaColumns: DataTableColumn[] = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (element) => `${element.id}`
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element) => `${element.name || ''}`
    }
  ];
  cinemaData$: Observable<CinemaDTO[]>;
  cinemaDisplayColumns: string[];
  totalCinemas$: Observable<number>;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private cinemasFacadeService: CinemasFacadeService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.cinemaData$ = this.cinemasFacadeService.cinemas$;
    this.cinemaDisplayColumns = this.cinemaColumns.map(c => c.columnDef);
    this.totalCinemas$ = this.cinemasFacadeService.totalCinemas$;
  }

  ngOnInit(): void {
    this.onPageChange({
      size: this.pageSize,
      page: this.pageIndex
    });
  }

  onPageChange(event: BaseRequest) {
    this.cinemasFacadeService.loadCinemas({
      size: event.size,
      page: event.page
    });
  }

  onAddCinema(): void {
    const form = [
      {
        label: 'Name',
        controlName: 'name',
        controlType: 'text',
        control: this.fb.group(
          { name: ['', [Validators.required]] }
        )
      }
    ];
    const dialogRef = this.dialog.open(CreateCinemaDialogComponent, {
      width: '25rem',
      data: { title: 'Create cinema' , form }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

}