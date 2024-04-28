import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExportToExcelService {
  public exportAsExcelFile(json: any[], excelFileName: string,firstLevelColumns:any[],secondLevelColumns:any[],thirdLevelColumns:any[],tablenames): void {

    var wb = {SheetNames:[], Sheets:{}};
    if(firstLevelColumns!=null){
      let actualData1=JSON.parse(JSON.stringify(json));
      let data1=this.organiseFirstLevelData(actualData1,firstLevelColumns);
      const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data1);
      wb.SheetNames.push("Sheet1"); wb.Sheets["Sheet1"] = worksheet1;
    }
    if(secondLevelColumns!=null){
      let actualData2=JSON.parse(JSON.stringify(json));
      let data2=this.organiseSecondLevelData(actualData2,secondLevelColumns,tablenames);
      const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data2);
      wb.SheetNames.push("Sheet2"); wb.Sheets["Sheet2"] = worksheet2;
    }
    if(thirdLevelColumns!=null){
      let actualData3=JSON.parse(JSON.stringify(json));
      let data3=this.organiseThirdLevelData(actualData3,thirdLevelColumns,tablenames);
      const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data3);
      wb.SheetNames.push("Sheet3"); wb.Sheets["Sheet3"] = worksheet3;
    }

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private organiseFirstLevelData(data:any[],firstLevelColumns){
    let originalData = [];
      data.forEach(element => {
      for (let value of firstLevelColumns) {
        if(value.isNestedColumn) {
          element[value.Name]=JSON.stringify(element[value.Name]);
        }        
      }
       originalData.push(element);
      });
      return originalData;
  }
  private organiseSecondLevelData(data:any[],secondLevelColumns,tablenames:string[]){
    let originalData = [];
    data.forEach(e1=>{
      e1[tablenames[0]].forEach(e2 => {
        for (let value1 of secondLevelColumns) {
          if(value1.isNestedColumn) {
            e2[value1.Name]=JSON.stringify(e2[value1.Name]);
          }
        }
       originalData.push(e2);
      });
    });
      return originalData;
  }
  private organiseThirdLevelData(data:any[],thirdLevelColumns,tablenames:string[]){
    let originalData = [];
    data.forEach(e3=>{
      e3[tablenames[0]].forEach(e4 => {
        e4[tablenames[1]].forEach(e5 => {
          for (let value2 of thirdLevelColumns) {
            if(value2.isNestedColumn) {
              e5[value2.Name]=JSON.stringify(e5[value2.Name]);
            }
          }
          originalData.push(e5);
        });
      });
    });
      return originalData;
  }
}

