import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleTableComponent } from '../shared/simple-table/simple-table.component';
import { SimpleTableColumn, SimpleTableSettings } from '../shared/simple-table/table-models/table-models';
import { settings } from 'cluster';


describe('SimpleTableComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        SimpleTableComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleTableComponent);
    tableComponent = fixture.componentInstance;

  }));

  let fixture: ComponentFixture<SimpleTableComponent>;
  let tableComponent: SimpleTableComponent;

  let tableColumns: SimpleTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First Name' },
    { key: 'secondName', title: 'Second Name' }

  ];
  let tableSettings: SimpleTableSettings = {
    actions: false,
    delete: false,
    edit: false
  }

  let testData = [{ id: 1, firstName: 'Alex', secondName: 'Moraris' }];

  it('should create the simple table component', () => {
     const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have all columns titles element', () => {
    //tableComponent.settings = tableSettings;
    //tableComponent.columns = tableColumns;
    //tableComponent.data = testData;
    attachToComponentInputData();
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement;
    let thElements: any[] = element.querySelectorAll('th');
    let thElementsArray = Array.from(thElements);
    for (let i = 0; i < tableColumns.length; i++) {
      expect(thElementsArray.some((el) => el.innerHTML.indexOf(tableColumns[i].title) >= 0)).toBeTruthy();
    }
  });

  function attachToComponentInputData(): void {
    tableComponent.settings = tableSettings;
    tableComponent.columns = tableColumns;
    tableComponent.data = testData;
  }

  it('should show all data', () => {
    attachToComponentInputData();
    fixture.detectChanges();
    let spanElements: any[] = fixture.debugElement.nativeElement.querySelectorAll('span');
    let spanElementArray = Array.from(spanElements);
    for (var i = 0; i < testData.length; i++) {
      for (let key in testData[i]) {
            expect(spanElementArray.some((el) => el.innerHTML == testData[i][key])).toBeTruthy();
         }
    }
  });

  it('should not show action and any actions', () => {
    attachToComponentInputData();
    fixture.detectChanges();
    let natElement = fixture.debugElement.nativeElement;
    let thElements: any[] = natElement.querySelectorAll('th');
    let thElementArray = Array.from(thElements);
    expect(thElementArray.some((el) => el.innerHTML == 'Actions')).toBeFalsy();

    let spanElements: any[] = natElement.querySelectorAll('span');
    let spanArray = Array.from(spanElements);
    expect(spanArray.some((el) => el.innerHTML.indexOf('Edit')>=0)).toBeFalsy();
    expect(spanArray.some((el) => el.innerHTML.indexOf('Delete')>=0)).toBeFalsy();
  });

  it('should show action and all ACTIONS', () => {
    tableSettings.actions = tableSettings.delete = tableSettings.edit = true;
    attachToComponentInputData();
    fixture.detectChanges();

    let natElement = fixture.debugElement.nativeElement;
    let thElements: any[] = natElement.querySelectorAll('th');
    let thArray = Array.from(thElements);
    expect(thArray.some((el) => el.innerHTML == 'Actions')).toBeTruthy();

    let spanElements:any[] = natElement.querySelectorAll('span');
    let spanArray = Array.from(spanElements);
    expect(spanArray.some((el) => el.innerHTML.indexOf('Edit')>=0)).toBeTruthy();
    expect(spanArray.some((el) => el.innerHTML.indexOf('Delete')>=0)).toBeTruthy();
  });

});
