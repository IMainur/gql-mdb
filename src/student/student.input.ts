import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";



@InputType()
export class CreateStudentInput{
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @Field()
    firstName:string;
    
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @Field()
    lastName:string;
}