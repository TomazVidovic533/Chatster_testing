import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-form-input-text',
  templateUrl: './custom-form-input-text.component.html',
  styleUrls: ['./custom-form-input-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomFormInputTextComponent,
      multi: true,
    },
  ],
})
export class CustomFormInputTextComponent implements OnInit, ControlValueAccessor {

  @Input() type!: string;
  @Input() placeholderValue!: string;
  inputValue!: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  selectedFile!: string;
  @Input() optionItems!: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.inputValue = obj;
  }

}
