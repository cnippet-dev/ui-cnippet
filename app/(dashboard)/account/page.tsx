import { redirect } from "next/navigation";

export default function ProfilePage() {
    redirect("/account/settings");
}
