import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {

  @Input() parentForm: FormGroup;
  fileName: string;
  constructor() { }

  onFileChange(event){
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      console.log(file);
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const arrayBuffer: any = reader.result;
        const array = new Uint8Array(arrayBuffer);
        const fileByteArray = [];
        for (let i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
        }
        // this.parentForm.controls[this.field.key].setValue(fileByteArray);
        if (this.parentForm.controls.fileName){
          this.parentForm.controls.fileName.setValue(this.fileName);
        }
      };
    }
  }

  acceptTypes(){
    // if (this.field.options && this.field.options.acceptTypes){
    //   return this.field.options.acceptTypes;
    // }
    return undefined;
  }
}