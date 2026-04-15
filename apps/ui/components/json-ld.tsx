export function SiteJsonLd() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description:
      "Accessible, composable React components built on Base UI and styled with Tailwind CSS. Copy, paste, and make it yours.",
    name: "Cnippet UI",
    url: "https://ui.cnippet.dev",
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    author: { "@type": "Person", name: "Deepak Negi" },
    description:
      "Accessible React components built on Base UI and Tailwind CSS",
    name: "Cnippet UI",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    operatingSystem: "Web",
    url: "https://ui.cnippet.dev",
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
        type="application/ld+json"
      />
    </>
  );
}

export function ComponentJsonLd({
  description,
  name,
  url,
}: {
  description: string;
  name: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    codeRepository: "https://github.com/cnippet-dev/ui-cnippet",
    description,
    license: "https://opensource.org/licenses/MIT",
    name: `${name} — Cnippet UI`,
    programmingLanguage: {
      "@type": "ComputerLanguage",
      name: "TypeScript",
    },
    runtimePlatform: "React",
    url,
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
}
