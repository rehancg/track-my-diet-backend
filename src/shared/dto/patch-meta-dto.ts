import { IsNotEmpty } from 'class-validator';

export class PatchMetaDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    name_si: string;

    @IsNotEmpty()
    description: string

    description_si: string
}
