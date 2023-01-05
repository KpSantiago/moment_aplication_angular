import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Moments } from 'src/app/interfaces/moments';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<Moments> = new EventEmitter();
  @Input() btnText!: string;
  // pode ser null pois nem sempre o dado chegrá
  @Input() momentData: Moments | null = null;

  // mommentForm - nome referente ao formulário
  // FormGroup - tipagem que vai identificar o forms como um grupo de forms
  mommentForm!: FormGroup;

  titulo: string = '';
  descricao: string = '';
  constructor() {}

  ngOnInit(): void {
    // inicializamos o precesso de validação aqui
    this.mommentForm = new FormGroup({
      // aqui ficará todo os campos possíveis do nosso forms
      // o Validators será utilizado para oprocesso de validção
      id: new FormControl(''),

      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });

    // edição
    if (this.momentData != null) {
      this.mommentForm = new FormGroup({
        id: new FormControl(this.momentData.id),

        title: new FormControl(this.momentData.title, [Validators.required]),
        description: new FormControl(this.momentData.description, [
          Validators.required,
        ]),
        image: new FormControl(''),
      });
    }
  }

  // incializando as propriedades de validação
  // é preciso incializa-las para que seja possível a validação
  // title
  get title() {
    return this.mommentForm.get('title');
  }
  // description
  get description() {
    return this.mommentForm.get('description');
  }

  selectedFile(image: any): void {
    // pegando imagem
    const file: File = image.target.files[0];

    // é preciso utilizar o patchValue para adicionar o img à propriedade
    // pois ela não consegue adicionar automaticamente como as outras
    this.mommentForm.patchValue({ image: file });
  }

  submit(): void {
    // console.log('deu certo', this.mommentForm.value);
    if (this.mommentForm.invalid) {
      return;
    }
    // enviando os dados do forms para o componente pai
    this.onSubmit.emit(this.mommentForm.value);
  }
}
