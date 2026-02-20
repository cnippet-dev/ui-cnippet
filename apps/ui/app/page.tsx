"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/shared/footer";
import { SiteHeader } from "@/components/shared/header/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

const _items = [
  {
    number: "2  ",
    title: "accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "5",
    title: "alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "4",
    title: "avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "3",
    title: "badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "2",
    title: "breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "3",
    title: "button",
    url: "/ui/actions/button",
  },
  {
    number: "4",
    title: "checkbox",
    url: "/ui/forms/checkbox",
  },
  {
    number: "5",
    title: "dialog",
    url: "/ui/overlays/dialog",
  },
];

const codeSnippets: Record<string, string> = {
  csharp: `using var client = new HttpClient();
client.DefaultRequestHeaders.Add(
    "Authorization", "Bearer YOUR_API_KEY");

var response = await client.PostAsJsonAsync(
    "https://api.apiflow.ai/v1/calls",
    new {
        number = "1234567890",
        voice_clone = "ENGLISH_MALE",
        script = "Hello, this is an ApiFlow phone agent. How can I assist you today?"
    }
);`,
  curl: `curl -X POST https://api.apiflow.ai/v1/calls \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "number": "1234567890",
    "voice_clone": "ENGLISH_MALE",
    "script": "Hello, this is an ApiFlow phone agent. How can I assist you today?"
  }'`,
  javascript: `const response = await fetch(
  "https://api.apiflow.ai/v1/calls",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: "1234567890",
      voice_clone: "ENGLISH_MALE",
      script: "Hello, this is an ApiFlow phone agent. How can I assist you today?",
    }),
  }
);`,
  php: `$ch = curl_init("https://api.apiflow.ai/v1/calls");

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY",
        "Content-Type: application/json",
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "number" => "1234567890",
        "voice_clone" => "ENGLISH_MALE",
        "script" => "Hello, this is an ApiFlow phone agent. How can I assist you today?",
    ]),
]);

$response = curl_exec($ch);`,
  python: `import requests

# Set API Key and Call Details
api_key = "YOUR_API_KEY"
call_number = "1234567890"
voice_clone = "ENGLISH_MALE"

# Create a New Call
response = requests.post(
    f"https://api.apiflow.ai/v1/calls",
    headers={"Authorization": f"Bearer {api_key}"},
    json={
        "number": call_number,
        "voice_clone": voice_clone,
        "script": "Hello, this is an ApiFlow phone agent. How can I assist you today?"
    }
)`,
  ruby: `require "net/http"
require "json"

uri = URI("https://api.apiflow.ai/v1/calls")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request["Authorization"] = "Bearer YOUR_API_KEY"
request["Content-Type"] = "application/json"
request.body = {
  number: "1234567890",
  voice_clone: "ENGLISH_MALE",
  script: "Hello, this is an ApiFlow phone agent. How can I assist you today?"
}.to_json

response = http.request(request)`,
};

const langTabs = [
  {
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
      </svg>
    ),
    label: "Python",
    value: "python",
  },
  {
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
    label: "JavaScript",
    value: "javascript",
  },
  {
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm-.047 4.801h.094c1.467 0 2.593.267 3.377.8.785.534 1.31 1.452 1.576 2.756l-1.452.503c-.2-.832-.525-1.442-.975-1.828-.45-.387-1.092-.597-1.925-.637V4.801zM9.075 6.907c-.666.013-1.271.142-1.815.387-.67.302-1.003.737-1.003 1.303 0 .71.474 1.254 1.425 1.63l1.83.735c1.4.565 2.323 1.076 2.771 1.533.45.457.674 1.088.674 1.893 0 1.072-.417 1.903-1.25 2.494-.834.59-1.94.894-3.32.912v1.502a.35.35 0 01-.047.003c-1.548-.01-2.73-.322-3.543-.936-.815-.613-1.3-1.607-1.46-2.98l1.548-.407c.11.923.437 1.617.983 2.08.545.463 1.323.701 2.33.716V14.18c-.085-.028-.163-.06-.244-.089l-1.59-.631c-1.344-.552-2.215-1.068-2.613-1.549-.396-.48-.594-1.098-.594-1.853 0-.97.388-1.733 1.163-2.289.66-.474 1.49-.76 2.493-.859v-.003h.262zm2.877 1.692h.094v2.089c.1.033.194.069.29.105l1.294.534c1.294.547 2.13 1.07 2.507 1.569.378.498.566 1.138.566 1.92 0 1.098-.374 1.953-1.123 2.563-.668.543-1.593.863-2.777.96v1.657h-.094a.35.35 0 01-.047.003h-.61v-1.66c-.08-.003-.166-.003-.245-.01v1.67h-.094v-1.705c-1.36-.113-2.415-.48-3.166-1.098v-.001c.193.15.398.29.625.416.7.39 1.557.621 2.573.696v-3.613l-.3-.122-.006-.003c-.083-.033-.162-.069-.238-.104v3.842h-.094v-3.983a6.79 6.79 0 01-.468-.26v4.243h-.094V13.09c-.182-.148-.34-.31-.474-.487-.313-.413-.47-.915-.47-1.504 0-.257.036-.495.109-.714.057-.117.114-.225.172-.324v-.001c.055-.093.114-.18.178-.26a3.233 3.233 0 01.485-.459v-.001c.148-.115.309-.22.485-.314a6.168 6.168 0 01.635-.308v-.001a6.2 6.2 0 01.453-.166V6.894h.094v1.585c.08-.024.163-.043.245-.057V6.894h.094v1.49c.092-.013.186-.02.279-.022V6.894h.094v1.465c.084 0 .17.003.255.012V6.895h.094v1.497a6.37 6.37 0 01.246.034V6.894h.094v1.592c.06.012.12.027.178.043v.07zm-2.1 5.397v3.595c.08.006.162.009.245.01v-3.523a4.05 4.05 0 01-.244-.082zm-.339-.133v3.451c-.884-.1-1.618-.34-2.2-.72a3.375 3.375 0 01-.245-.174v.001c.582.542 1.386.872 2.412.99v-3.405l-.104-.044c-.024-.011-.05-.019-.073-.03-.085-.033-.164-.069-.235-.106v3.585h-.094v-3.727c-.21-.128-.38-.27-.51-.429-.285-.35-.427-.784-.427-1.303 0-.043 0-.084.003-.124.08.5.32.923.72 1.273.29.254.657.457 1.098.608.086.033.17.063.253.09v-3.518l.074.023c.076.022.162.05.255.082v3.376c.064.018.131.033.198.046v-3.303c.082.017.163.036.245.058v3.278a4.3 4.3 0 00.254.03v-3.187c.082.012.163.027.245.046v3.155c.084.003.17.003.254.003v-3.08a7.36 7.36 0 01.236.016v3.064h.094V10.73l.051.01v3.098c.06.003.12.01.178.019v-3.03c.082.03.16.064.233.1v2.97c.067.017.13.04.19.066v-2.862c.236.139.42.31.554.51.225.335.338.759.338 1.27 0 .513-.123.948-.37 1.307-.245.358-.62.643-1.125.856a4.78 4.78 0 01-.255.096v3.447h-.094v-3.386a4.94 4.94 0 01-.245.05v3.336h-.094v-3.269c-.084.01-.169.015-.254.018v3.25h-.094v-3.245a6.697 6.697 0 01-.245-.003v3.248h-.094v-3.277a4.33 4.33 0 01-.178-.022v3.3h-.094v-3.362a3.878 3.878 0 01-.254-.06z" />
      </svg>
    ),
    label: "C#",
    value: "csharp",
  },
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
    label: "cURL",
    value: "curl",
  },
  {
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 01-.305.847c-.143.255-.33.49-.56.703zm4.94.547l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174h-1.146l-.7 3.624H10.24l1.23-6.327h1.382l-.327 1.682h1.239c.783 0 1.324.13 1.624.39.3.26.38.69.238 1.294l-.565 2.96h-1.42zm4.401-3.108l-.515 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.048-.29h-.943zm2.484 1.864a2.836 2.836 0 01-.305.847c-.143.256-.33.49-.56.703-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164h-1.182l-.327 1.682h-1.378l1.23-6.327h2.649c.797 0 1.378.209 1.744.628.366.418.477 1.002.331 1.752z" />
      </svg>
    ),
    label: "PHP",
    value: "php",
  },
  {
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.156.083c3.033.525 3.893 2.598 3.829 4.77L24 4.822 22.635 22.71 20.2 23.97l-7.074.013c-.792 0-1.05-.39-.823-.863l.878-1.863 4.152-.014.56-1.127h-4.986l1.575-3.092 4.62-.014.575-1.137h-5.442l3.358-6.554-3.455 3.366h-.01l-2.3 2.1-2.645 5.173-.21.395-.64 1.282c-.456.858-1.397.858-2.177.326l-2.56-2.074-.73 1.447c-.348.687-1.015.884-1.637.474L.105 18.397c-.56-.357-.587-.994-.077-1.482l3.838-3.573c.088-.083.17-.157.249-.24L13.4.182A4.735 4.735 0 0115.974.004a8.357 8.357 0 014.182.079z" />
      </svg>
    ),
    label: "Ruby",
    value: "ruby",
  },
];

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ImplementationSection() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("python");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippets[activeTab] ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-b bg-neutral-950 px-4 md:px-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-neutral-800 border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          <Badge className="rounded-full border-orange-500/30 bg-orange-600 px-4 py-1 text-white text-xs hover:bg-orange-600 sm:text-sm">
            Implementation
          </Badge>
          <h1 className="font-figtree font-semibold text-2xl text-white leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Get started with less than 10 lines of code
          </h1>
          <p className="max-w-xl text-neutral-400 text-sm sm:text-base md:text-lg">
            Copy the API implementation code and start your first call.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 sm:mt-12">
          <Tabs
            defaultValue="python"
            onValueChange={(val) => {
              setActiveTab(val as string);
              setCopied(false);
            }}
          >
            <TabsList className="w-full justify-start gap-0 rounded-none border-neutral-800 border-b bg-neutral-900 p-0">
              {langTabs.map((tab) => (
                <TabsTab
                  className="rounded-none border-transparent px-4 py-3 text-neutral-400 hover:text-neutral-200 data-active:border-orange-500 data-active:border-b-2 data-active:bg-neutral-800/50 data-active:text-white sm:px-5"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.icon}
                </TabsTab>
              ))}
            </TabsList>

            {Object.entries(codeSnippets).map(([lang, code]) => (
              <TabsPanel key={lang} value={lang}>
                <div className="max-h-72 overflow-auto p-4 sm:p-6">
                  <pre className="font-mono text-[13px] text-neutral-300 leading-relaxed sm:text-sm">
                    <code>{code}</code>
                  </pre>
                </div>
              </TabsPanel>
            ))}
          </Tabs>

          <div className="border-neutral-800 border-t px-4 py-3">
            <button
              className="mx-auto flex items-center gap-2 text-neutral-400 text-sm transition-colors hover:text-white"
              onClick={handleCopy}
              type="button"
            >
              {copied ? (
                <>
                  Copied!
                  <CheckIcon className="size-4" />
                </>
              ) : (
                <>
                  Copy code snippet
                  <CopyIcon className="size-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const customerStories = [
  {
    caseStudy: {
      company: "Legaipsum",
      description:
        "A major healthcare provider adopted ApiFlow's AI Voice API to automate routine administrative tasks such as appointment scheduling, patient registration, and billing inquiries. This automation freed up healthcare staff to focus on more complex responsibilities, leading to a 50% reduction in administrative costs and improved patient care through more efficient and accurate data management.",
      title: "Improving Patient Care with ApiFlow",
    },
    category: "Healthcare",
    testimonial: {
      name: "Dr. Emily Roberts",
      quote:
        "ApiFlow's AI voice API has revolutionized our administrative processes. By automating routine tasks like appointment scheduling and billing inquiries, we've cut administrative costs by 50%.",
      role: "Chief Administrative Officer at HealthPlus",
    },
  },
  {
    caseStudy: {
      company: "ShopScale",
      description:
        "A leading retail chain integrated ApiFlow's voice AI to handle customer support calls during peak shopping seasons. The system managed order tracking, returns processing, and product inquiries autonomously, reducing wait times by 70% and increasing customer satisfaction scores by 35%.",
      title: "Scaling Retail Support with Voice AI",
    },
    category: "Retail",
    testimonial: {
      name: "Sarah Chen",
      quote:
        "During Black Friday, ApiFlow handled over 10,000 customer calls without a single drop. Our support team could finally focus on complex issues while AI managed the routine inquiries.",
      role: "VP of Customer Experience at RetailMax",
    },
  },
  {
    caseStudy: {
      company: "DealFlow",
      description:
        "A B2B SaaS company deployed ApiFlow to automate their outbound sales qualification process. The AI agent conducted initial discovery calls, qualified leads based on custom criteria, and scheduled meetings with sales reps. This resulted in a 3x increase in qualified pipeline and 40% faster sales cycles.",
      title: "Automating B2B Sales Qualification",
    },
    category: "B2B sales",
    testimonial: {
      name: "James Park",
      quote:
        "ApiFlow's voice agents qualify leads 24/7 with the same consistency and quality as our top sales reps. Our pipeline has tripled since implementation.",
      role: "Head of Sales at CloudVentures",
    },
  },
  {
    caseStudy: {
      company: "NeuralVox",
      description:
        "An AI startup built a multilingual voice assistant using ApiFlow's platform that supports 20+ languages with natural-sounding speech. The assistant handles customer onboarding, technical support, and feedback collection, enabling the startup to scale globally without hiring region-specific support teams.",
      title: "Building a Global Voice Assistant",
    },
    category: "AI Startups",
    testimonial: {
      name: "Anika Patel",
      quote:
        "We went from supporting 2 languages to 20 in under a month. ApiFlow's multilingual capabilities gave us a global presence overnight.",
      role: "Co-founder & CTO at VoiceStack",
    },
  },
];

function CustomerStoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaApi, setEmblaApi] =
    useState<
      Parameters<
        NonNullable<React.ComponentProps<typeof Carousel>["setApi"]>
      >[0]
    >();

  const scrollTo = (index: number) => {
    setActiveIndex(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <section className="border-b bg-neutral-950 px-4 md:px-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-neutral-800 border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center space-y-4 text-center sm:mb-14">
          <Badge className="rounded-full border-orange-500/30 bg-orange-600 px-4 py-1 text-white text-xs hover:bg-orange-600 sm:text-sm">
            Customer stories
          </Badge>
          <h1 className="font-figtree font-medium text-2xl text-white leading-tight sm:text-3xl md:text-4xl">
            How businesses are using ApiFlow
          </h1>
          <p className="max-w-xl text-neutral-400 text-sm sm:text-base">
            Learn how business from different industries are using our platform
            to automate processes.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {customerStories.map((story, index) => (
            <button
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                activeIndex === index
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
              }`}
              key={story.category}
              onClick={() => scrollTo(index)}
              type="button"
            >
              {story.category}
            </button>
          ))}
        </div>

        <Carousel
          opts={{ align: "start", watchDrag: false }}
          setApi={(api) => {
            setEmblaApi(api);
            api?.on("select", () => {
              setActiveIndex(api.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent>
            {customerStories.map((story) => (
              <CarouselItem key={story.category}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
                    <blockquote className="mb-6 text-neutral-300 text-sm leading-relaxed sm:text-base">
                      &ldquo;{story.testimonial.quote}&rdquo;
                    </blockquote>
                    <div>
                      <p className="font-medium text-sm text-white">
                        {story.testimonial.name}
                      </p>
                      <p className="text-neutral-500 text-xs sm:text-sm">
                        {story.testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
                    <div className="mb-4 inline-block rounded-md bg-neutral-800 px-3 py-1.5 font-medium text-neutral-200 text-xs tracking-wide sm:text-sm">
                      {story.caseStudy.company}
                    </div>
                    <h3 className="mb-3 font-figtree font-medium text-lg text-white sm:text-xl">
                      {story.caseStudy.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {story.caseStudy.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-20 sm:px-6 sm:py-28 md:py-40 lg:px-0">
          <div>
            <div className="">
              <div className="absolute inset-0 z-0 flex-none overflow-hidden bg-amber-100 [-webkit-mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] [mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] dark:bg-neutral-800" />

              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 text-center sm:space-y-6">
                <Badge className="rounded-full px-3 py-1 text-xs sm:text-sm">
                  Build Faster Than Ever
                </Badge>
                <h1 className="px-4 font-figtree font-medium text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Ship stunning interfaces faster with Cnippet UI.
                </h1>
                <p className="max-w-2xl px-4 text-base text-muted-foreground sm:text-lg md:text-xl">
                  Production-ready React components, smart animations &
                  insightful charts.
                </p>
                <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:gap-2 sm:px-0">
                  <Button
                    className="mx-auto w-fit rounded-full border-blue-700 bg-blue-800 px-6 py-2.5 text-white hover:bg-blue-800 sm:w-auto"
                    render={<Link href="/" />}
                  >
                    Get Started
                  </Button>
                  <Button
                    className="mx-auto w-fit px-6 py-2.5 sm:w-auto"
                    render={<Link href="/ui/actions/button" />}
                    variant="ghost"
                  >
                    Explore components
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h1 className="mb-3 font-figtree font-normal text-2xl sm:mb-4 sm:text-3xl md:text-4xl">
              Essential UI components
            </h1>
            <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
              Build React interfaces faster with production-ready UI components.
              Perfectly integrated with Next.js. Custom Tailwind styling,
              zero-config setup.
            </p>
          </div>
          <div>
            <div className="">
              <div className="grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {_items.map((item, index) => (
                  <div key={`${item.title}-${index}`}>
                    <div className="space-y-3 text-center">
                      <Link
                        className="peer relative inline-flex overflow-hidden rounded-lg border transition-all hover:border-primary/50 sm:flex dark:border-zinc-700/80 dark:hover:border-zinc-600"
                        href={item.url}
                      >
                        <Image
                          alt={`${item.title} component preview`}
                          className="h-44 w-full object-cover sm:h-48 md:h-52"
                          height={1080}
                          loading="lazy"
                          src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
                          width={1920}
                        />
                      </Link>

                      <div className="[&_a]:peer-hover:underline">
                        <h2>
                          <Link
                            className="font-medium text-sm capitalize hover:underline sm:text-base"
                            href={item.url}
                          >
                            {item.title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground text-xs sm:text-[13px]">
                          {item.number} Components
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h1 className="mb-3 font-figtree font-medium text-2xl sm:mb-4 sm:text-3xl md:text-4xl">
              Powerful & efficient UI components
            </h1>
            <p className="mx-auto max-w-xl text-muted-foreground text-sm sm:text-base">
              Here&apos;s what sets our components apart
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            {[
              {
                description:
                  "Components maintained and updated regularly. No need for manual patches or worrying about outdated dependencies.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "Always Up-to-Date",
              },
              {
                description:
                  "Built with a modular, layered approach so you can use individual pieces or the full component library.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                ),
                title: "Layered Architecture",
              },
              {
                description:
                  "Optimized for speed with minimal bundle size. Every component is tree-shakeable and lightweight.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                  </svg>
                ),
                title: "Blazing Performance",
              },
              {
                description:
                  "Tailwind-first styling with sensible defaults. Override any style to match your brand perfectly.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                title: "Fully Customizable",
              },
              {
                description:
                  "WAI-ARIA compliant with keyboard navigation and screen reader support baked into every component.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="18" rx="2" width="18" x="3" y="3" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                title: "Accessible by Default",
              },
              {
                description:
                  "Seamless integration with Next.js App Router, Server Components, and the entire React ecosystem.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" />
                  </svg>
                ),
                title: "Next.js Optimized",
              },
            ].map((feature) => (
              <div className="space-y-3" key={feature.title}>
                <div className="text-foreground">{feature.icon}</div>
                <h3 className="font-figtree font-medium text-base sm:text-lg">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <ImplementationSection />

      {/* Customer Stories Section */}
      <CustomerStoriesSection />

      {/* Testimonials Section */}
      <section className="border-b bg-neutral-950 px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-neutral-800 border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h1 className="mb-3 font-figtree font-medium text-2xl text-white sm:mb-4 sm:text-3xl md:text-4xl">
              Companies love building with ApiFlow
            </h1>
            <p className="mx-auto max-w-xl text-neutral-400 text-sm sm:text-base">
              Here&apos;s what our customers say about us
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                avatar: "JD",
                company: "TechCorp",
                name: "John Doe",
                quote:
                  "ApiFlow has revolutionized our customer service with its 24/7 availability.",
                role: "Lead Developer",
              },
              {
                avatar: "JS",
                company: "Innovate Solutions",
                name: "Jane Smith",
                quote:
                  "The ultra-realistic voices of ApiFlow have significantly improved our user engagement.",
                role: "CTO",
              },
              {
                avatar: "CM",
                company: "GlobalTech",
                name: "Carlos Martinez",
                quote:
                  "ApiFlow's multilingual capability allows us to support our diverse customer base effortlessly.",
                role: "Software Engineer",
              },
              {
                avatar: "EJ",
                company: "FutureAI",
                name: "Emily Johnson",
                quote:
                  "Using custom language models with ApiFlow has enabled us to create highly contextual voice agents.",
                role: "AI Specialist",
              },
              {
                avatar: "MB",
                company: "NextGen",
                name: "Michael Brown",
                quote:
                  "The ability to connect external actions has streamlined our operations and increased efficiency.",
                role: "Product Manager",
              },
              {
                avatar: "SL",
                company: "InsightHQ",
                name: "Sarah Lee",
                quote:
                  "ApiFlow's analytics and monitoring tools provide valuable insights into our bot's performance.",
                role: "Data Analyst",
              },
            ].map((testimonial) => (
              <div
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6"
                key={testimonial.name}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-700 font-medium text-sm text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-neutral-500 text-xs">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-neutral-300 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      className="size-4"
                      fill="currentColor"
                      key={`star-${testimonial.name}-${i}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
