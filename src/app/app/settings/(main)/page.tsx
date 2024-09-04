import { ProfileForm } from "./_components/form";
import { auth } from "@/services/auth";

export default async function Page() {
  const session = await auth();

  return session && <ProfileForm defaultValues={session.user} />;
}
