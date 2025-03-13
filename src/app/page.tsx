import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard"); // Instantly redirect to /dashboard
}
