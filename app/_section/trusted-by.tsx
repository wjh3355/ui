import Image from "next/image";
import Link from "next/link";

interface Organization {
  name: string;
  logo: string;
  alt: string;
  url: string;
}

interface TrustedByProps {
  className?: string;
}

const organizations: Organization[] = [
  {
    name: "Oikova",
    logo: "/svgs/oikova_logo_light.svg",
    alt: "Oikova Logo",
    url: "https://oikova.com"
  }
  // Add more Organization here later
];

const TrustedBy = ({ className }: TrustedByProps) => {
  return (
    <div className={`flex flex-col items-center gap-2 ${className || ""}`}>
      <h2 className="text-lg font-medium text-muted-foreground">Trusted By</h2>
      <div className="flex items-center justify-center flex-wrap gap-4">
        {organizations.map((organization) => (
          <Link
            key={organization.name}
            href={organization.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-8 py-2 bg-background/50 hover:bg-background/80 transition-colors rounded-lg group cursor-pointer"
          >
            <Image
              src={organization.logo}
              alt={organization.alt}
              width={180}
              height={50}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
