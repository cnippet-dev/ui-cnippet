import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
    userEmail?: string;
    resetLink?: string;
}

export const ResetPasswordEmail = ({
    userEmail,
    resetLink,
}: ResetPasswordEmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Preview>Reset your password</Preview>
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
                                Reset your password
                            </Heading>
                        </Section>

                        <Section className="mb-4">
                            <Text className="mb-2 text-[14px] leading-[22px] text-[#202124]">
                                Hello{" "}
                                <span className="font-medium">{userEmail}</span>
                                ,
                            </Text>
                            <Text className="text-[14px] leading-[22px] text-[#202124]">
                                You have recently requested to reset the
                                password for your <strong>Cnippet</strong>{" "}
                                account. Click the button below to create a new
                                password.
                            </Text>
                        </Section>

                        <Section className="mb-4 text-center">
                            <Button
                                className="inline-block rounded-lg border-none bg-[#0066ff] px-6 py-3 text-center text-[16px] font-medium text-white no-underline"
                                href={resetLink}
                            >
                                Reset Password
                            </Button>
                        </Section>

                        <Section className="mb-4">
                            <Text className="text-[12px] leading-[22px] text-[#5f6368]">
                                If you didn&apos;t request a password reset,
                                please ignore this email. This link will expire
                                in 24 hours for security reasons. Don&apos;t
                                share this email with anyone. Our customer
                                service will never ask for your password.
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

ResetPasswordEmail.PreviewProps = {
    userEmail: "cnippetdev-6152",
    resetLink: "https://ui.cnippet.site/reset-password?token=abc123",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
