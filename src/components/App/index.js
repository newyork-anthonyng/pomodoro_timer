import React, { Component } from 'react';
import TimerApp from '../TimerApp';
import TimerWorker from '../../utility/webworkerWrapper';
import WebNotifications from '../WebNotifications';
import Title from '../Title';
import uuid from '../../utility/uuid';
import timeFormatter from '../../utility/timeFormatter';
import localStorage from '../../utility/localStorage';

class App extends Component {
  constructor() {
    super();

    this.WORK_TIME = 25 * 60 * 1000; // 25 minutes
    this.BREAK_TIME = 5 * 60 * 1000; // 5 minutes

    this.state = {
      isWorking: true,
      timeInMs: this.WORK_TIME,
      timerIsActive: false,
      tasks: [],
      taskInputValue: '',
    };

    this.createWorker = this.createWorker.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleKeyboardShortcuts = this.handleKeyboardShortcuts.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleTaskInputChange = this.handleTaskInputChange.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClearAllClick = this.handleClearAllClick.bind(this);
  }

  componentDidMount() {
    this.createWorker();
    this.fetchTasks();

    document.addEventListener('keypress', this.handleKeyboardShortcuts);
  }

  createWorker() {
    this.timerWorker = new TimerWorker();

    this.timerWorker.onmessage = (e) => {
      switch (e.data.action) {
      case 'TICK':
        this.setState({ timeInMs: e.data.time });
        break;
      case 'COMPLETE':
        this.setState({
          timerIsActive: false,
          isWorking: !this.state.isWorking,
          timeInMs: this.state.isWorking ? this.BREAK_TIME : this.WORK_TIME,
        }, () => {
          if (this.notification) {
            this.notification.createNotification({
              body: this.state.isWorking ? 'Back to work' : 'Take a break',
            });
          }
        });
        break;
      }
    };
  }

  handleKeyboardShortcuts(e) {
    if (!e.ctrlKey) return;

    switch (e.key) {
    case 'q':
      if (this.state.timerIsActive) {
        this.handlePauseClick();
      } else {
        this.handlePlayClick();
      }
      break;
    case 'r':
      this.handleResetClick();
      break;
    case 'Enter':
      this.handleTaskSubmit();
      break;
    }
  }

  fetchTasks() {
    this.setState({
      tasks: localStorage.get() || [],
    });
  }

  handlePlayClick() {
    this.timerWorker.postMessage({
      action: 'START',
      time: this.state.timeInMs,
    });

    this.setState({
      timerIsActive: true,
    });
  }

  handlePauseClick() {
    this.timerWorker.postMessage({
      action: 'STOP',
    });

    this.setState({
      timerIsActive: false,
    });
  }

  handleResetClick() {
    this.timerWorker.postMessage({
      action: 'STOP',
    });

    this.setState({
      timerIsActive: false,
      timeInMs: this.WORK_TIME,
      isWorking: true,
    });
  }

  handleTaskInputChange(e) {
    this.setState({
      taskInputValue: e.target.value,
    });
  }

  handleTaskSubmit() {
    if (this.state.taskInputValue.trim().length === 0) {
      return;
    }

    const newTasks = [{
      id: `${uuid()}`,
      title: `${this.state.tasks.length + 1}`,
      text: this.state.taskInputValue,
    }].concat(this.state.tasks);

    this.setState({
      tasks: newTasks,
      taskInputValue: '',
    });

    localStorage.set(newTasks);
  }

  handleDeleteClick(id) {
    const newTasks = this.state.tasks.filter((task) => task.id !== id);

    this.setState({
      tasks: newTasks,
    });

    localStorage.set(newTasks);
  }

  handleClearAllClick() {
    const tasks = [];
    this.setState({ tasks });

    localStorage.set(tasks);
  }

  render() {
    const {
      timeInMs,
      timerIsActive,
      tasks,
      taskInputValue,
    } = this.state;

    return (
      <div>
        <Title text={timeFormatter(this.state.timeInMs)} />

        <TimerApp
          onPlayClick={this.handlePlayClick}
          onPauseClick={this.handlePauseClick}
          onResetClick={this.handleResetClick}
          timeInMs={timeInMs}
          timerIsActive={timerIsActive}
          tasks={tasks}
          onTaskInputChange={this.handleTaskInputChange}
          taskInputValue={taskInputValue}
          onTaskSubmit={this.handleTaskSubmit}
          onTaskDeleteClick={this.handleDeleteClick}
          onClearAllClick={this.handleClearAllClick}
        />
        <WebNotifications ref={(notification) => this.notification = notification} />
      </div>
    );
  }
}

export default App;
