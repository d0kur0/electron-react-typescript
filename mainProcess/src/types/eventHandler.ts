export type EventHandler = {
  name: string;
  callback: () => void;
};

export type EventHandlers = EventHandler[];
