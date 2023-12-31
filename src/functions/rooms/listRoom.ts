import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ValidationError from "src/errors/ValidationError";
import { ok } from "src/utils/Returns";

const listRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id } = event.pathParameters;

    if (id === undefined)
        throw new ValidationError("Id não formatado!");

    const database = new RoomsRepositories();

    const room = await database.findById(id);

    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");

    if (await database.roomIsEmpty(room)  === true)
        return ok ("message", "Quarto vazio!");
    
    return ok("message", room);
  };
  
  export const handler = Handler(listRoom);