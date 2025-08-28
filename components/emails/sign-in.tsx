import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
    Hr,
} from "@react-email/components";

interface SignInAlertEmailProps {
    username?: string;
    userEmail?: string;
    time?: string;
    browser?: string;
    ip?: string;
    location?: string;
    userAgent?: string;
    recentActivityUrl?: string;
    accessTokensUrl?: string;
    manageNotificationsUrl?: string;
}

export const SignInEmail = ({
    username = "there",
    userEmail = "user@example.com",
    time = "",
    browser = "",
    ip = "",
    location = "Unknown",
    userAgent = "",
    recentActivityUrl = "https://cnippet.dev/account/security",
    accessTokensUrl = "https://cnippet.dev/account/tokens",
    manageNotificationsUrl = "https://cnippet.dev/account/notifications",
}: SignInAlertEmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Preview>New sign-in to your account</Preview>
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

                        <Section className="mb-4">
                            <Text className="mb-2 text-[14px] leading-[22px] text-[#202124]">
                                Hi{" "}
                                <span className="font-semibold">
                                    {username}
                                </span>
                                ,
                            </Text>
                            <Text className="text-[14px] leading-[22px] text-[#202124]">
                                Your <strong>Cnippet</strong> account{" "}
                                <span className="font-semibold">
                                    {userEmail}
                                </span>{" "}
                                was recently signed-in from a new location,
                                device or browser.
                            </Text>
                        </Section>

                        <Section className="mb-4 rounded-lg bg-[#f8f9fa] p-4">
                            <Row>
                                <Column width="120">
                                    <Text className="m-0 text-[13px] text-[#5f6368]">
                                        Time
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="m-0 text-[13px] text-[#202124]">
                                        {time}
                                    </Text>
                                </Column>
                            </Row>
                            <Row>
                                <Column width="120">
                                    <Text className="m-0 text-[13px] text-[#5f6368]">
                                        Browser
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="m-0 text-[13px] text-[#202124]">
                                        {browser}
                                    </Text>
                                </Column>
                            </Row>
                            <Row>
                                <Column width="120">
                                    <Text className="m-0 text-[13px] text-[#5f6368]">
                                        IP
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="m-0 text-[13px] text-[#202124]">
                                        {ip}
                                    </Text>
                                </Column>
                            </Row>
                            <Row>
                                <Column width="120">
                                    <Text className="m-0 text-[13px] text-[#5f6368]">
                                        Location
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="m-0 text-[13px] text-[#202124]">
                                        {location}
                                    </Text>
                                </Column>
                            </Row>
                            <Row>
                                <Column width="120">
                                    <Text className="m-0 text-[13px] text-[#5f6368]">
                                        User agent
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="m-0 text-[13px] whitespace-pre-line text-[#202124]">
                                        {userAgent}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mb-2">
                            <Text className="mb-2 text-[14px] font-medium text-[#202124]">
                                Don&apos;t recognize this activity?
                            </Text>
                            <Text className="text-[14px] leading-[22px] text-[#202124]">
                                Review your{" "}
                                <Link
                                    href={recentActivityUrl}
                                    className="text-[#0066ff] no-underline"
                                >
                                    recent activity
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href={accessTokensUrl}
                                    className="text-[#0066ff] no-underline"
                                >
                                    access tokens
                                </Link>{" "}
                                now.
                            </Text>
                        </Section>
                        <Text className="text-[13px] leading-[22px] text-[#5f6368]">
                            We are sending you this email because we were unable
                            to determine if you have signed-in from this
                            location or browser before. This may be because you
                            are traveling, using a VPN or Private Relay, a new
                            or updated browser, or another person is using your
                            account.
                        </Text>

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
                            <Text className="mt-2 text-[12px]">
                                <Link
                                    href={manageNotificationsUrl}
                                    className="text-[#0066ff] no-underline"
                                >
                                    Manage your notification settings
                                </Link>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

SignInEmail.PreviewProps = {
    username: "cnippetdev-6152",
    userEmail: "cnippet.dev@gmail.com",
    time: "Tuesday, August 5, 2025 at 6:02 PM UTC",
    browser: "Chrome 138.0.0.0 on Windows 10",
    ip: "157.49.180.104",
    location: "Ghaziabad, Uttar Pradesh, India",
    userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nAppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    recentActivityUrl: "https://cnippet.dev/account/security",
    accessTokensUrl: "https://cnippet.dev/account/tokens",
    manageNotificationsUrl: "https://cnippet.dev/account/notifications",
} as SignInAlertEmailProps;

export default SignInEmail;
