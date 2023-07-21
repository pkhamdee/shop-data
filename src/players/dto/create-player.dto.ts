import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePlayerDto {
    id: number;

    @ApiProperty({example:'name', description: 'player name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example:100, description: 'price'})
    @IsInt()
    @Min(0)
    price: number;
}
