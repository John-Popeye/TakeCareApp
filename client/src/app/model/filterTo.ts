export class FilterTo {

  public constructor(init?: Partial<FilterTo>) {
    Object.assign(this, init);
  }

  startDate: Date;
  endDate: Date;
  city: string;

}
