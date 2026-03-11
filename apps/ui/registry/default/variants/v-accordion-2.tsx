// import {
//   Accordion,
//   AccordionItem,
//   AccordionPanel,
//   AccordionTrigger,
// } from "@/registry/default/ui/accordion";

// export default function Component() {
//   const items = [
//     {
//       content:
//         "Cnippet Ui is a library of high-quality unstyled React components for design systems and web apps.",
//       id: "1",
//       title: "What is Cnippet Ui?",
//     },
//     {
//       content:
//         "Head to the \"Quick start\" guide in the docs. If you've used unstyled libraries before, you'll feel at home.",
//       id: "2",
//       title: "How do I get started?",
//     },
//     {
//       content: "Of course! Cnippet Ui is free and open source.",
//       id: "3",
//       title: "Can I use it for my project?",
//     },
//   ];

//   return (
//     <Accordion className="w-lg" defaultValue={["1"]}>
//       <AccordionItem>
//         <AccordionTrigger>Accordion inside and an accordion</AccordionTrigger>
//         <AccordionPanel>
//           <Accordion className="w-lg pl-4" defaultValue={["3"]}>
//             {items.map((item) => (
//               <AccordionItem key={item.id} value={item.id}>
//                 <AccordionTrigger>{item.title}</AccordionTrigger>
//                 <AccordionPanel>{item.content}</AccordionPanel>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </AccordionPanel>
//       </AccordionItem>
//       <AccordionItem>
//         <AccordionTrigger>This can be a surprize</AccordionTrigger>
//         <AccordionPanel>Surpisseee!! 🙌</AccordionPanel>
//       </AccordionItem>
//     </Accordion>
//   );
// }

import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    content:
      "We use industry-standard AES-256 encryption to protect your sensitive information at rest and in transit.",
    trigger: "Data Security",
    value: "security",
  },
  {
    content:
      "Seamlessly connect with your favorite tools using our robust REST API and pre-built connectors.",
    trigger: "API Integration",
    value: "integration",
  },
  {
    content:
      "Invite team members, assign roles, and work together in real-time on shared projects and documents.",
    trigger: "Team Collaboration",
    value: "collaboration",
  },
];

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Accordion defaultValue={["security"]}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger
              className="hover:no-underline"
              icon={
                <div className="flex h-7 w-7 items-center justify-center">
                  <Plus className="in-data-panel-open:hidden" size={16} />
                  <Minus
                    className="in-data-panel-open:block hidden"
                    size={16}
                  />
                </div>
              }
            >
              <span>{item.trigger}</span>
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
