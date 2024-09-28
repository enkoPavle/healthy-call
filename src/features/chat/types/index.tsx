export interface IPrediction {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdFromIp: string;
  requestId: string;
  input: string;
  output: string | null;
  type: string;
  status: string;
  completedAt: string | null;
}
