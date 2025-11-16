declare module 'nprogress' {
    interface NProgressOptions {
      minimum?: number;
      easing?: string;
      positionUsing?: string;
      speed?: number;
      trickle?: boolean;
      trickleSpeed?: number;
      showSpinner?: boolean;
    }
  
    interface NProgress {
      configure(options: NProgressOptions): NProgress;
      done(force?: boolean): void;
      inc(amount?: number): void;
      start(): void;
      set(n: number): void;
      isStarted(): boolean;
    }
  
    const NProgress: NProgress;
    export default NProgress;
  }
  