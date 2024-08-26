import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
/* import { createCheckoutSessionAction } from "./actions"; */
import { auth } from "@/services/auth";

/* import { getUserCurrentPlan } from "@/services/stripe"; */

export default async function Page() {
  const session = await auth();
  /*  const plan = await getUserCurrentPlan(session?.user.id as string); */

  return (
    /*   <form action={createCheckoutSessionAction}> */
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Uso do Plano</CardTitle>
        <CardDescription>
          Você está atualmente no{" "}
          <span className="font-bold uppercase">
            {/* {plan.name} */}plano name
          </span>
          .
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <header className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              plano{" "}
              {/* {plan.quota.TASKS.current}/{plan.quota.TASKS.available} */}
            </span>
            <span className="text-muted-foreground text-sm">
              {/* {plan.quota.TASKS.usage} */}90%
            </span>
          </header>
          <main>
            {/*  <Progress value={plan.quota.TASKS.usage} /> */}
            <Progress value={90} />
          </main>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-6">
        <span>Para um maior limite, assine o PRO</span>
        <Button type="submit">Assine por R$9/ mês</Button>
      </CardFooter>
    </Card>
    /*  </form> */
  );
}
