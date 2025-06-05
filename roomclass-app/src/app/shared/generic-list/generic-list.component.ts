import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent {
  @Input() name: string = ''; //This input is used to specify the name of the list (Subjects or professors)
  @Input() nameAtribute: string = ''; //This input is used to specify the attribute to display the item's name
  @Input() items: any[] = [];
  @Input() showViewButton: boolean = true; // This input is used to control the visibility of the view button
  @Input() showEditButton: boolean = true; // This input is used to control the visibility of the edit button

  @Output() onView = new EventEmitter<any>(); // This output is used to emit the item to be viewed when the view button is clicked
  @Output() onEdit = new EventEmitter<any>(); // This output is used to emit the item to be edited when the edit button is clicked
  @Output() onDelete = new EventEmitter<any>(); // This output is used to emit the item to be deleted when the delete button is clicked
  @Output() onAdd = new EventEmitter<void>(); // This output is used to emit an event when the add button is clicked
  
  searchTerm: string = '';
  filteredItems: any[] = [];

  ngOnChanges() {
    this.filteredItems = [...this.items];
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item[this.nameAtribute]?.toLowerCase().includes(term)
    );
  }
}
