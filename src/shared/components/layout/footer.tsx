import {InstagramLogoIcon} from "@radix-ui/react-icons";
import {Heart} from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div>
        <p className="mb-2 text-center">
          Developed with <Heart className="inline size-[1.2rem] text-red-500" /> by{" "}
          <a
            className="font-semibold hover:underline"
            href="https://entornodev.com"
            rel="noopener"
            target="_blank"
          >
            Entornodev
          </a>
        </p>
        <p className="text-center">Schoolpp &copy; 2024</p>
      </div>
    </footer>
  );
}
