
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New contact form submission from {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Contact Form Submission</Heading>

                    <Section style={section}>
                        <Text style={label}>
                            <strong>Name:</strong>
                        </Text>
                        <Text style={value}>{name}</Text>

                        <Text style={label}>
                            <strong>Email:</strong>
                        </Text>
                        <Text style={value}>{email}</Text>

                        <Text style={label}>
                            <strong>Message:</strong>
                        </Text>
                        <Text style={messageBox}>{message}</Text>
                    </Section>

                    <Text style={footer}>
                        This email was generated from your website contact form.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#f9f9f9',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
};

const section = {
    padding: '0 48px',
};

const h1 = {
    color: '#1a73e8',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.3',
    margin: '16px 0',
    padding: '0 48px',
};

const label = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    margin: '16px 0 4px 0',
};

const value = {
    fontSize: '16px',
    lineHeight: '1.4',
    color: '#111827',
    margin: '0 0 16px 0',
};

const messageBox = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#111827',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #e5e5e7',
    borderRadius: '4px',
    margin: '0 0 24px 0',
};

const footer = {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center' as const,
    margin: '24px 0 0 0',
};
