import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Row,
    Column,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
    subject?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_URL}`
    : "http://localhost:3000";

export const ContactEmail = ({
    name,
    email,
    message,
    subject = "Contact Form Submission",
}: ContactEmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Preview>Thank you for contacting Cnippet</Preview>
                <Body className="font-['Google Sans',Roboto,Arial,sans-serif] mx-auto my-auto bg-[#f8f9fa] px-2 py-6">
                    <Container className="mx-auto max-w-full w-[500px] rounded-2xl bg-white p-6">
                        {/* Header Section */}
                        <Section className="mb-4 text-center">
                            <Img
                                src={`${baseUrl}/images/logo-light.png`}
                                width="80"
                                height="auto"
                                alt="Cnippet Logo"
                                className="mx-auto rounded-full"
                            />
                        </Section>

                        {/* Main Content */}
                        <Section className="mx-auto mb-4">
                            <Row>
                                <Column>
                                    <Heading className="mb-4 text-center text-[24px] font-normal text-[#202124]">
                                        Thank You for Contacting Us
                                    </Heading>

                                    <Text className="mb-4 text-center text-[14px] text-[#5f6368]">
                                        Dear {name},
                                    </Text>

                                    <Text className="mb-4 text-[14px] text-[#5f6368]">
                                        Thank you for reaching out to us. We
                                        have received your message and will get
                                        back to you as soon as possible.
                                    </Text>

                                    <div className="rounded-lg bg-[#f8f9fa] p-6">
                                        <Text className="m-0 mb-2 text-[14px] font-medium text-[#202124]">
                                            Here&apos;s a copy of the message by {email}:
                                        </Text>
                                        <div className="mb-4">
                                            <Text className="m-0 text-[14px] font-medium text-[#202124]">
                                                Subject:
                                            </Text>
                                            <Text className="m-0 text-[14px] text-[#5f6368]">
                                                {subject}
                                            </Text>
                                        </div>

                                        <div>
                                            <Text className="m-0 text-[14px] font-medium text-[#202124]">
                                                Message:
                                            </Text>
                                            <Text className="m-0 whitespace-pre-wrap text-[14px] leading-6 text-[#5f6368]">
                                                {message}
                                            </Text>
                                        </div>
                                    </div>

                                    <Section className="mt-6 text-center">
                                        <Text className="mb-4 text-[14px] text-[#5f6368]">
                                            If you need to send us additional
                                            information, please reply to this
                                            email.
                                        </Text>
                                    </Section>
                                </Column>
                            </Row>
                        </Section>

                        <hr className="my-6 border-t border-[#e8eaed]" />
                        {/* Footer */}
                        <Section className="mt-2 text-center">
                            <Text className="my-1 text-[12px] text-[#5f6368]">
                                © {new Date().getFullYear()} Cnippet LLC · All
                                rights reserved
                            </Text>
                            <Text className="my-1 text-[12px] text-[#5f6368]">
                                This is an automated confirmation of your
                                contact form submission.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactEmail;
