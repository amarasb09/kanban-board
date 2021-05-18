import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string = '';
  stageNumber: number;
  taskDetail: string = ''

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'Task 1', stage: 0, detail: 'This is task one', showDetail: false },
      { name: 'Task 2', stage: 0, detail: 'This is task two', showDetail: false },
      { name: 'Task 3', stage: 1, detail: 'This is task 3', showDetail: false },
      { name: 'Task 4', stage: 2, detail: 'This is task 4', showDetail: false },
      { name: 'Task 5', stage: 3, detail: 'This is task 5', showDetail: false },
      { name: 'Task 6', stage: 3, detail: 'This is task 6', showDetail: false },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  addTask() {
    if (this.taskName.length) {
      const newTask: Task = {
        name: this.taskName,
        stage: this.stageNumber,
        detail: this.taskDetail,
        showDetail: false
      }
      this.stagesTasks[this.stageNumber].push(newTask);
      this.stageNumber = undefined;
      this.taskName = undefined;
      this.taskDetail = undefined;
    }
  }

  goBack(task, i) {
    let preStage = task.stage;
    task.stage--;
    this.stagesTasks[task.stage].push(task);
    this.stagesTasks[preStage].splice(i, 1);
  }

  goForward(task, i) {
    let preStage = task.stage;
    task.stage++;
    this.stagesTasks[task.stage].push(task);
    this.stagesTasks[preStage].splice(i, 1);
  }

  toogleDetail(task: Task) {
    task.showDetail = !task.showDetail
  }


  deleteTask(task, i) {
    console.log(task, i);
    this.stagesTasks[task.stage].splice(i, 1);
    console.log(this.stagesTasks);
  }

  getTaskClass(i: number) {
    return `stage-${i + 1}`;
  }

  getCardClass(i: number) {
    return `stage-${i + 1}`;
  }

}



interface Task {
  name: string;
  stage: number;
  detail?: string;
  showDetail?: boolean
}