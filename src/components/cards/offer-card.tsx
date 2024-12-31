import { cn } from "../../lib/cn";
import type { Offer } from "./type";
import { match } from "ts-pattern";

function shorten(content: string, length: number): string {
  return content.length > length
    ? content.substring(0, length) + "..."
    : content;
}

function formatCompanyName(company: string) {
  return shorten(company.split(/・| - /)[0], 32);
}

export default function OfferCard(props: Offer) {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "border flex flex-col justify-between group hover:opacity-50 duration-200 p-2 space-y-2 min-h-32",
        {
          "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400":
            props.seniority === "NOEXPERIENCE",
          "border-red-700 text-red-700 dark:border-red-400 dark:text-red-400":
            props.seniority === "JUNIOR",
        }
      )}
    >
      <div>
        <h1 className="text-lg">{props.title}</h1>
      </div>
      <div className="flex justify-between items-end">
        <div className="w-full">
          <div className="flex gap-2 justify-between items-end w-full">
            <div>
              <h2 className="whitespace-nowrap">
                {formatCompanyName(props.company || "")}
              </h2>
              {props.salary ? (
                <p className="bg-green-600 dark:bg-green-500 text-white dark:text-black w-fit">
                  {props.salary}
                </p>
              ) : (
                <div></div>
              )}
            </div>
            <p>
              {match(props.location)
                .with("KOREA", () => "Corea del Sur")
                .with("REMOTE", () => "Remoto")
                .with("JAPAN", () => "Japón")
                .with("ONSITE", () => "Chile")
                .otherwise(() => null)}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}