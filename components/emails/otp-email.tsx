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
    Tailwind,
    Hr,
    Link,
} from "@react-email/components";
import * as React from "react";

interface OTPEmailProps {
    userEmail?: string;
    otp?: string;
    location?: string;
}

export const OTPEmail = ({
    userEmail = "user@example.com",
    otp = "123456",
}: OTPEmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Preview>Verify your email to sign in to Cnippet</Preview>
                <Body className="font-['Google Sans',Roboto,Arial,sans-serif] mx-auto my-auto bg-[#f8f9fa] px-2 py-6">
                    <Container className="mx-auto max-w-[520px] rounded-2xl bg-white p-6">
                        <Section className="mb-2 text-center">
                            <Img
                                src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1753948225/logo-light.png`}
                                width="50"
                                height="50"
                                alt="Logo"
                                className="mx-auto"
                            />
                        </Section>

                        <Section className="mb-4 text-center">
                            <Heading className="m-0 text-[24px] font-medium text-[#202124]">
                                Verify your email to sign in to Cnippet
                            </Heading>
                        </Section>

                        <Section className="mb-4">
                            <Text className="mb-2 text-[14px] leading-[22px] text-[#202124]">
                                Hello{" "}
                                <span className="font-medium">{userEmail}</span>
                                ,
                            </Text>
                            <Text className="text-[14px] leading-[22px] text-[#202124]">
                                To complete the sign-in process, enter the
                                6-digit code in the original window, or enter it
                                in a new one by going to the link below:
                            </Text>
                        </Section>

                        <Section className="mb-4 rounded-lg bg-[#f8f9fa] p-4 text-center">
                            <Text className="m-0 font-mono text-[20px] font-medium tracking-widest text-[#202124]">
                                {otp}
                            </Text>
                        </Section>

                        <Section className="mb-4">
                            <Text className="text-[12px] leading-[22px] text-[#5f6368]">
                                If you didn&apos;t attempt to sign in but
                                received this email, please ignore this email.
                                Don&apos;t share or forward the 6-digit code
                                with anyone. Our customer service will never ask
                                for it. Do not read this code out loud. Be
                                cautious of phishing attempts and always verify
                                the sender and domain (cnippet.dev) before
                                acting.
                            </Text>
                        </Section>

                        <Hr className="my-6 w-full border border-solid border-[#eaeaea]" />

                        <Section className="text-left">
                            <Text className="mb-2 text-[13px] text-[#5f6368]">
                                If you&apos;ve got questions, ask us in the{" "}
                                <Link
                                    href="https://cnippet.dev/community"
                                    className="text-[#0066ff] no-underline"
                                >
                                    Cnippet Community
                                </Link>
                                .
                            </Text>
                            <Text className="m-0 text-[12px] text-[#5f6368]">
                                Copyright © {new Date().getFullYear()} Cnippet
                                LLC. All rights reserved.
                            </Text>
                            <Text className="m-0 text-[12px] text-[#5f6368]">
                                440 N Barranca Ave #4133 Covina, CA 91723
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

OTPEmail.PreviewProps = {
    userEmail: "cnippetdev-6152",
    otp: "348277",
    location: "Meerut, India",
} as OTPEmailProps;

export default OTPEmail;
