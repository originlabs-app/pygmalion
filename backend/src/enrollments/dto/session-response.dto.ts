export class SessionResponseDto {
  id: string;
  start_date: Date;
  end_date: Date;
  location?: string;
  max_capacity: number;
  current_capacity: number;
  price: number;
  modality: string;
}
