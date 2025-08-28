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

interface AccountDeletionEmailProps {
    username?: string;
    userEmail?: string;
    deletionLink?: string;
    reason?: string;
}

export const AccountDeletionEmail = ({
    username = "User",
    userEmail = "user@example.com",
    deletionLink = "http://localhost:3000/confirm-deletion",
    reason,
}: AccountDeletionEmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Preview>Confirm your account deletion request</Preview>
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
                                Confirm Account Deletion
                            </Heading>
                        </Section>

                        <Section className="mb-4">
                            <Text className="mb-2 text-[14px] leading-[22px] text-[#202124]">
                                Hello <span className="font-medium">{username}</span>,
                            </Text>
                            <Text className="text-[14px] leading-[22px] text-[#202124]">
                                You have requested to permanently delete your <strong>Cnippet</strong> account. 
                                This action is irreversible and will remove all your data, including:
                            </Text>
                            <Text className="text-[14px] leading-[22px] text-[#202124] ml-4">
                                • Your profile and settings<br/>
                                • All saved favorites and preferences<br/>
                                • Account history and data
                            </Text>
                            {reason && (
                                <Text className="text-[14px] leading-[22px] text-[#202124] mt-2">
                                    <strong>Reason provided:</strong> {reason}
                                </Text>
                            )}
                        </Section>

                        <Section className="mb-4 text-center">
                            <Button
                                className="inline-block rounded-lg border-none bg-[#dc2626] px-6 py-3 text-center text-[16px] font-medium text-white no-underline"
                                href={deletionLink}
                            >
                                Confirm Account Deletion
                            </Button>
                        </Section>

                        <Section className="mb-4">
                            <Text className="text-[12px] leading-[22px] text-[#5f6368]">
                                If you didn&apos;t request this deletion or have changed your mind, 
                                please ignore this email. Your account will remain active. 
                                This confirmation link will expire in 24 hours for security reasons.
                            </Text>
                        </Section>

                        <Hr className="my-6 w-full border border-solid border-[#eaeaea]" />

                        <Section className="text-left">
                            <Text className="mb-2 text-[13px] text-[#5f6368]">
                                If you&apos;ve got questions or need help, ask us in the{" "}
                                <Link
                                    href="https://cnippet.dev/community"
                                    className="text-[#0066ff] no-underline"
                                >
                                    Cnippet Community
                                </Link>
                                .
                            </Text>
                            <Text className="m-0 text-[12px] text-[#5f6368]">
                                Copyright © {new Date().getFullYear()} Cnippet LLC. All rights reserved.
                            </Text>
                            <Text className="m-0 text-[12px] text-[#5f6368]">
                                This email was sent to {userEmail}
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
