import { IsNotEmpty } from 'class-validator';

export class CreateMetaDto {
    @IsNotEmpty()
    name: string;

    name_si: string;

    @IsNotEmpty()
    description: string

    description_si: string
}
