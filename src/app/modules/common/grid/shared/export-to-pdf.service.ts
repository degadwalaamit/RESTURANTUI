import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable()
export class ExportToPDFService {
  FirstLevelHead = [];
  SecondLevelHead = [];
  ThirdLevelHead = [];
  public exportAsPDFFile(json: any[], PDFFileName: string, firstLevelColumns: any[], secondLevelColumns, thirdLevelColumns, Tablenames): void {

    var doc = new jsPDF.jsPDF('l', 'mm', [400, 300]);

    doc.setFontSize(11);
    doc.setTextColor(100);
    if (firstLevelColumns != null) {
      (doc as any).autoTable({
        body: this.organiseFirstLevelData(json, firstLevelColumns),
        head: this.FirstLevelHead,
        theme: 'striped',
      });
    }
    if (secondLevelColumns != null) {
      (doc as any).autoTable({
        body: this.organiseSecondLevelData(json, secondLevelColumns, Tablenames),
        head: this.SecondLevelHead,
        theme: 'striped',
      });
    }
    if (thirdLevelColumns != null) {
      (doc as any).autoTable({
        body: this.organiseThirdLevelData(json, thirdLevelColumns, Tablenames),
        head: this.ThirdLevelHead,
        theme: 'striped',
      });
    }

    doc.save(PDFFileName + '_export_' + new Date().getTime() + ".pdf");

  }

  private organiseFirstLevelData(data: any[], firstLevelColumns) {
    let originalData = [];
    let insideColumn = [];
    data.forEach(element => {
      let insideArray = [];
      insideColumn = [];    
      for (let value of firstLevelColumns) {
        insideColumn.push(value.Name);
        if (value.isNestedColumn) {
          insideArray.push(JSON.stringify(element[value.Name]));
        } else {
          insideArray.push(element[value.Name]);
        }
      }
      originalData.push(insideArray);
    });
    this.FirstLevelHead.push(insideColumn);
    return originalData;
  }
  private organiseSecondLevelData(data: any[], secondLevelColumns, Tablenames) {
    let originalData = [];
    let insideColumn = [];
    data.forEach(e1 => {
      e1[Tablenames[0]].forEach(e2 => {
        let insideArray = [];
        insideColumn = [];
        for (let value1 of secondLevelColumns) {
          insideColumn.push(value1.Name);
          if (value1.isNestedColumn) {
            insideArray.push(JSON.stringify(e2[value1.Name]));
          } else {
            insideArray.push(e2[value1.Name]);
          }
        }        
        originalData.push(insideArray);
      });
    });
    this.SecondLevelHead.push(insideColumn);
    return originalData;
  }
  private organiseThirdLevelData(data: any[], thirdLevelColumns, Tablenames) {
    let originalData = [];
    let insideColumn = [];
    data.forEach(e3 => {
      e3[Tablenames[0]].forEach(e4 => {
        e4[Tablenames[1]].forEach(e5 => {
          let insideArray = [];
          insideColumn = [];
          for (let value2 of thirdLevelColumns) {
            insideColumn.push(value2.Name);
            if (value2.isNestedColumn) {
              insideArray.push(JSON.stringify(e5[value2.Name]));
            } else {
              insideArray.push(e5[value2.Name]);
            }
          }          
          originalData.push(insideArray);
        });
      });

    });
    this.ThirdLevelHead.push(insideColumn);
    return originalData;
  }
}

