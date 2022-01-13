export interface PortsInterface {
  self: string,
  events: string
  invoices: string,
}

export interface DBConfigInterface {
  name: string,
  host: string,
  user: string,
  pass: string,
}

export interface ServerInterface {
  db: DBConfigInterface;

  isDevelopment: boolean;

  dns: string;

  ports: PortsInterface;
}
