import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SocialLoginProps {}

export const SocialLogin: FC<SocialLoginProps> = () => {
  const handleOnClick = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/members" });
  };

  return (
    <div className="flex items-center w-full gap-2">
      <Button
        size="lg"
        fullWidth
        variant="bordered"
        onClick={() => handleOnClick("google")}
      >
        <FcGoogle size={20} />
      </Button>
      <Button
        size="lg"
        fullWidth
        variant="bordered"
        onClick={() => handleOnClick("github")}
      >
        <FaGithub size={20} />
      </Button>
    </div>
  );
};
