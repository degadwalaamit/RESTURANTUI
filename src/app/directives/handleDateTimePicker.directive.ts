import { Directive, ElementRef, Renderer2 } from '@angular/core';  
  
@Directive({  
    selector: '[handleDateTimePicker]'  
})  

export class HandleDateTimePicker {  
    
    constructor(private el: ElementRef, private render: Renderer2) {  
        
        render.listen(el.nativeElement, 'keypress', (event) => { 


                var date=this.el.nativeElement.value.split("/", 3);
                var year=date[2].split(" ", 2)[0];    
                var hh=date[2].split(" ", 2)[1].split(":")[0];
                var mm=date[2].split(" ", 2)[1].split(":")[1].split(" ");

                if(this.el.nativeElement.selectionStart>=15 && (event.charCode==112 || event.charCode==80
                    || event.charCode==109 || event.charCode==77 || event.charCode==97 || event.charCode==65))
                {
                    return true;
                }
                else
                {
                    if(date[0].length<=1 || date[1].length<=1 || year.length<=3 || hh<=1 || mm<=5)
                    {          
                        if(hh==1)
                        {
                            
                            if(event.charCode==49 || event.charCode==48 || event.charCode==50)
                            {
                                return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57);     
                            }
                            else
                            {
                                return false;
                            } 
                        }                  
                        return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57);     
                    }
                    else
                    {
                        return false;
                    }

                }
        })
        render.listen(el.nativeElement, 'keyup', (event) => { 
        
            var spaceCnt = this.el.nativeElement.value.split(" ").length - 1;  
            var colonCnt = this.el.nativeElement.value.split(":").length-1;            
            if( this.el.nativeElement.selectionStart<=15 && (spaceCnt!=2 || colonCnt!=1)) 
            {
                this.el.nativeElement.value='';
            }    
        })
        }   
  
    
}  