export interface Product {
    CustomerId: string;
    Domain: string;
    DurationMonths: number;
    ProductName: string;
    StartDate: Date;

    emails?: Date[];
    endDate?: Date;
}