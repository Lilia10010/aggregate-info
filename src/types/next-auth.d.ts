import { User } from "@prisma/client";

//para sobrepor o tipo de sessão do next-auth
declare module "next-auth" {
  interface Session {
    user: User;
  }
}
