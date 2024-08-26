import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getUserTodos } from "./actions";

//pega o que a função retorna e cria a tipagem (perigoso)
export type Todo = ReturnTypeWithoutPromise<typeof getUserTodos>[0];
