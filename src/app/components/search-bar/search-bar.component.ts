import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  pesquisa: string = '';

  @Output() searchChange = new EventEmitter<string>();

  onPesquisar(valor: string) {
    this.pesquisa = valor;
    this.searchChange.emit(valor);
  }
}