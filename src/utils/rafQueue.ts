type LoopCallback = (timestamp: number) => void;

type OnceCallback = () => void;

class RafQueue {
  private rafId = 0;
  private onceTasks = new Map<string, OnceCallback>();
  private loopTasks = new Map<string, LoopCallback>();

  private ensureRaf = (): void => {
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(this.tick);
  };

  private tick = (timestamp: number): void => {
    this.rafId = 0;

    if (this.onceTasks.size) {
      const tasks = Array.from(this.onceTasks.values());
      this.onceTasks.clear();
      for (const task of tasks) task();
    }

    if (this.loopTasks.size) {
      const loops = Array.from(this.loopTasks.values());
      for (const loop of loops) loop(timestamp);
    }

    if (this.loopTasks.size || this.onceTasks.size) {
      this.ensureRaf();
    }
  };

  public scheduleOnce = (key: string, cb: OnceCallback): void => {
    this.onceTasks.set(key, cb);
    this.ensureRaf();
  };

  public cancelOnce = (key: string): void => {
    this.onceTasks.delete(key);
  };

  public startLoop = (key: string, cb: LoopCallback): (() => void) => {
    this.loopTasks.set(key, cb);
    this.ensureRaf();

    return () => {
      this.loopTasks.delete(key);
    };
  };

  public stopLoop = (key: string): void => {
    this.loopTasks.delete(key);
  };
}

const rafQueue = new RafQueue();

export default rafQueue;
