import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateMerchantDto {

    id: number;

    @ApiPropertyOptional({ example: 'VMware Jacket', description: 'product short description' })
    @IsNotEmpty()
    @IsString()
    product: string;

    @ApiPropertyOptional({ example: 'https://emea.vmwaremerchandise.com/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/s/o/softshell_fr.jpg', description: 'image url' })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({ example: 100, description: 'price' })
    @IsInt()
    @Min(0)
    price: number;

    @ApiPropertyOptional({ example: 'price start from 10$ to 500$', description: 'hint that meaningful for player' })
    @IsOptional()
    @IsString()
    hint: string;

    @ApiPropertyOptional({ example: 'false', description: 'status of game, false=end, true=start' })
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
