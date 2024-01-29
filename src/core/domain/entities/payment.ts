export type Payment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  orderId: string;
  status: string;
};
